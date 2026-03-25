from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
<<<<<<< HEAD
from .models import User


=======
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()


# ─────────────────────────────────────────
# User Serializer (read/update profile)
# ─────────────────────────────────────────
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = [
            'id', 'email', 'username',
            'first_name', 'last_name',
            'role', 'is_verified', 'is_active',
            'phone', 'bio', 'location', 'website',
            'profile_picture', 'date_joined',
        ]
        read_only_fields = ['id', 'is_verified', 'date_joined']
        extra_kwargs = {'password': {'write_only': True}}


# ─────────────────────────────────────────
# Register Serializer (new user signup)
# ─────────────────────────────────────────
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=6,
        style={'input_type': 'password'}
    )

    class Meta:
        model  = User
        fields = ['email', 'password', 'first_name', 'last_name', 'role']
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name':  {'required': False},
            'role':       {'required': False},
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with this email already exists."
            )
        return value

    def validate_role(self, value):
        valid_roles = ['candidate', 'employer', 'admin']
        if value and value not in valid_roles:
            raise serializers.ValidationError(
                f"Role must be one of: {', '.join(valid_roles)}"
            )
        return value

    def create(self, validated_data):
        email = validated_data['email']

        # ✅ Generate unique username to avoid UNIQUE constraint error
        username = email
        if User.objects.filter(username=username).exists():
            username = f"{email}_{uuid.uuid4().hex[:6]}"

        user = User.objects.create_user(
            username    = username,
            email       = email,
            password    = validated_data['password'],
            first_name  = validated_data.get('first_name', ''),
            last_name   = validated_data.get('last_name', ''),
            role        = validated_data.get('role', 'candidate'),
            is_verified = False,
        )
        return user


# ─────────────────────────────────────────
# Old serializer kept for backward compat
# ─────────────────────────────────────────
>>>>>>> upstream/jobportelteam
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
<<<<<<< HEAD
        model = User
        fields = ['id', 'username', 'email', 'password', 'password_confirm', 'role', 'first_name', 'last_name']
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
=======
        model  = User
        fields = [
            'id', 'username', 'email', 'password',
            'password_confirm', 'role', 'first_name', 'last_name'
        ]
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name':  {'required': False},
>>>>>>> upstream/jobportelteam
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
<<<<<<< HEAD
            raise serializers.ValidationError({"password": "Password fields didn't match."})
=======
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
>>>>>>> upstream/jobportelteam
        return attrs

    def validate_role(self, value):
        valid_roles = ['candidate', 'employer', 'admin']
        if value not in valid_roles:
<<<<<<< HEAD
            raise serializers.ValidationError(f"Role must be one of: {', '.join(valid_roles)}")
=======
            raise serializers.ValidationError(
                f"Role must be one of: {', '.join(valid_roles)}"
            )
>>>>>>> upstream/jobportelteam
        return value

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
<<<<<<< HEAD
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'is_verified', 'date_joined']
        read_only_fields = ['id', 'is_verified', 'date_joined']
=======
            username   = validated_data['username'],
            email      = validated_data['email'],
            password   = validated_data['password'],
            role       = validated_data['role'],
            first_name = validated_data.get('first_name', ''),
            last_name  = validated_data.get('last_name', ''),
        )
        return user
>>>>>>> upstream/jobportelteam
