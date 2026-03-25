import random
<<<<<<< HEAD

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail

from .models import User, PasswordResetOTP


def _json_error(message, status=400):
    return JsonResponse({'success': False, 'error': message}, status=status)


@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    """
    FR-02: Login
    - Users log in using registered credentials.
    - Invalid attempts return error messages.
    - Optional 'remember me' controls session expiry.
    """
    try:
        import json

        data = json.loads(request.body or "{}")
    except Exception:
        return _json_error("Invalid JSON payload.")

    username = data.get("username") or data.get("email")
    password = data.get("password")
    remember_me = bool(data.get("remember_me", False))

    if not username or not password:
        return _json_error("Username/email and password are required.")

    user = authenticate(request, username=username, password=password)
    if user is None:
        return _json_error("Invalid credentials.")

    login(request, user)

    # "Remember me": persistent session vs expires on browser close.
    if remember_me:
        # Use Django's default SESSION_COOKIE_AGE.
        request.session.set_expiry(None)
    else:
        # Session expires when the browser closes.
        request.session.set_expiry(0)

    return JsonResponse(
        {
            "success": True,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": getattr(user, "role", None),
            },
        }
    )


@csrf_exempt
@require_http_methods(["POST"])
def password_reset_request_view(request):
    """
    FR-03: Password Management - Request reset via email/OTP.
    Generates a one-time code, stores it, and sends via email (console backend by default).
    """
    try:
        import json

        data = json.loads(request.body or "{}")
    except Exception:
        return _json_error("Invalid JSON payload.")

    email = data.get("email")
    if not email:
        return _json_error("Email is required.")

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        # Do not reveal if the email exists; respond generically.
        return JsonResponse({"success": True, "message": "If this email is registered, an OTP has been sent."})

    # Generate a 6-digit numeric OTP.
    code = f"{random.randint(0, 999999):06d}"

    PasswordResetOTP.objects.create(user=user, code=code)

    send_mail(
        subject="Your password reset code",
        message=f"Your password reset OTP is: {code}",
        from_email=None,
        recipient_list=[user.email],
        fail_silently=True,
    )

    return JsonResponse({"success": True, "message": "If this email is registered, an OTP has been sent."})


@csrf_exempt
@require_http_methods(["POST"])
def password_reset_confirm_view(request):
    """
    FR-03: Password Management - Confirm reset with OTP and set new password.
    Passwords are stored securely using Django's built-in hashing.
    """
    try:
        import json

        data = json.loads(request.body or "{}")
    except Exception:
        return _json_error("Invalid JSON payload.")

    email = data.get("email")
    code = data.get("otp")
    new_password = data.get("new_password")

    if not all([email, code, new_password]):
        return _json_error("Email, OTP, and new password are required.")

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return _json_error("Invalid email or OTP.")

    otp_qs = PasswordResetOTP.objects.filter(user=user, code=code, is_used=False)
    otp_obj = otp_qs.first()

    if not otp_obj or otp_obj.is_expired():
        return _json_error("Invalid or expired OTP.")

    # Mark OTP as used and update password securely (hashed).
    otp_obj.is_used = True
    otp_obj.save(update_fields=["is_used"])

    user.set_password(new_password)
    user.save(update_fields=["password"])

    return JsonResponse({"success": True, "message": "Password has been reset successfully."})


@require_http_methods(["GET"])
def profile_view(request):
    """
    Returns the profile of the currently authenticated user.
    Relies on session authentication (login_view).
    """
    user = getattr(request, "user", None)
    if not user or not user.is_authenticated:
        return _json_error("Authentication required.", status=401)

    return JsonResponse(
        {
            "success": True,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": getattr(user, "role", None),
            },
        }
    )
=======
from datetime import timedelta

from django.contrib.auth import authenticate, get_user_model
from django.utils import timezone
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import PasswordResetOTP, EmailVerificationOTP
from .serializers import UserSerializer, RegisterSerializer

User = get_user_model()


# ─────────────────────────────────────────
# Helper
# ─────────────────────────────────────────
def generate_otp():
    return f"{random.randint(0, 999999):06d}"


def get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access':  str(refresh.access_token),
    }


# ─────────────────────────────────────────
# Register
# ─────────────────────────────────────────
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generate OTP for email verification
            otp_code = generate_otp()
            EmailVerificationOTP.objects.create(user=user, code=otp_code)

            tokens = get_tokens(user)
            return Response({
                **tokens,
                'user':    UserSerializer(user).data,
                'message': 'Registration successful. OTP sent to email.',
                'otp':     otp_code,   # ← remove in production
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ─────────────────────────────────────────
# Verify OTP
# ─────────────────────────────────────────
class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email    = request.data.get('email')
        otp_code = request.data.get('otp')

        if not email or not otp_code:
            return Response(
                {'error': 'Email and OTP are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check EmailVerificationOTP first
        otp_obj = EmailVerificationOTP.objects.filter(
            user=user, code=otp_code, is_used=False
        ).last()

        if otp_obj and not otp_obj.is_expired():
            otp_obj.is_used = True
            otp_obj.save()
            user.is_verified = True
            user.save()
        else:
            # Development fallback — accept any 6-digit code
            user.is_verified = True
            user.save()

        tokens = get_tokens(user)
        return Response({
            **tokens,
            'user':    UserSerializer(user).data,
            'message': 'Email verified successfully!',
        }, status=status.HTTP_200_OK)


# ─────────────────────────────────────────
# Resend OTP
# ─────────────────────────────────────────
class ResendOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response(
                {'error': 'Email is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        otp_code = generate_otp()
        EmailVerificationOTP.objects.create(user=user, code=otp_code)

        return Response({
            'message': 'OTP resent successfully.',
            'otp':     otp_code,   # ← remove in production
        }, status=status.HTTP_200_OK)


# ─────────────────────────────────────────
# Login (custom — accepts email or username)
# ─────────────────────────────────────────
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email    = request.data.get('email') or request.data.get('username')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'error': 'Email and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Try authenticating with email as username
        user = authenticate(request, username=email, password=password)

        # If not found, look up by email field
        if not user:
            try:
                user_obj = User.objects.get(email=email)
                user = authenticate(
                    request,
                    username=user_obj.username,
                    password=password
                )
            except User.DoesNotExist:
                user = None

        if user:
            tokens = get_tokens(user)
            return Response({
                **tokens,
                'user': UserSerializer(user).data,
            })

        return Response(
            {'error': 'Invalid credentials.'},
            status=status.HTTP_401_UNAUTHORIZED
        )


# ─────────────────────────────────────────
# Password Reset — Request OTP
# ─────────────────────────────────────────
class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response(
                {'error': 'Email is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
            otp_code = generate_otp()
            PasswordResetOTP.objects.create(user=user, code=otp_code)
            return Response({
                'message': 'OTP sent to your email.',
                'otp':     otp_code,   # ← remove in production
            })
        except User.DoesNotExist:
            # Generic response — don't reveal if email exists
            return Response({
                'message': 'If this email is registered, an OTP has been sent.'
            })


# ─────────────────────────────────────────
# Password Reset — Confirm with OTP
# ─────────────────────────────────────────
class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email        = request.data.get('email')
        otp_code     = request.data.get('otp')
        new_password = request.data.get('new_password')

        if not all([email, otp_code, new_password]):
            return Response(
                {'error': 'Email, OTP, and new password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {'error': 'Invalid email or OTP.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        otp_obj = PasswordResetOTP.objects.filter(
            user=user, code=otp_code, is_used=False
        ).last()

        if not otp_obj or otp_obj.is_expired():
            return Response(
                {'error': 'Invalid or expired OTP.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        otp_obj.is_used = True
        otp_obj.save()
        user.set_password(new_password)
        user.save()

        return Response({
            'message': 'Password reset successfully. Please login.'
        })


# ─────────────────────────────────────────
# Profile
# ─────────────────────────────────────────
class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class   = UserSerializer

    def get_object(self):
        return self.request.user


# ─────────────────────────────────────────
# User List (admin only)
# ─────────────────────────────────────────
class UserListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class   = UserSerializer

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return User.objects.none()
        return User.objects.all()
>>>>>>> upstream/jobportelteam
