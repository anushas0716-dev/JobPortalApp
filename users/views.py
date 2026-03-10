import random

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
