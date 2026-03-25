from datetime import timedelta
<<<<<<< HEAD

=======
>>>>>>> upstream/jobportelteam
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

<<<<<<< HEAD
class User(AbstractUser):
    ROLE_CHOICES = (
        ('candidate', 'Candidate'),
        ('employer', 'Employer'),
        ('admin', 'Admin'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    is_verified = models.BooleanField(default=False)
=======

class User(AbstractUser):
    ROLE_CHOICES = (
        ('candidate', 'Candidate'),
        ('employer',  'Employer'),
        ('admin',     'Admin'),
    )

    email           = models.EmailField(unique=True)
    role            = models.CharField(max_length=20, choices=ROLE_CHOICES, default='candidate')
    is_verified     = models.BooleanField(default=False)
    phone           = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    bio             = models.TextField(blank=True, null=True)
    location        = models.CharField(max_length=100, blank=True, null=True)
    website         = models.URLField(blank=True, null=True)
    created_at      = models.DateTimeField(null=True, blank=True, auto_now_add=True)
    updated_at      = models.DateTimeField(null=True, blank=True, auto_now=True)

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    class Meta:
        verbose_name        = 'User'
        verbose_name_plural = 'Users'
>>>>>>> upstream/jobportelteam

    def __str__(self):
        return self.email

<<<<<<< HEAD

class PasswordResetOTP(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='password_reset_otps')
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def is_expired(self) -> bool:
        return self.created_at < timezone.now() - timedelta(minutes=10)
=======
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()


class PasswordResetOTP(models.Model):
    user       = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='password_reset_otps'
    )
    code       = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used    = models.BooleanField(default=False)

    class Meta:
        ordering            = ['-created_at']
        verbose_name        = 'Password Reset OTP'
        verbose_name_plural = 'Password Reset OTPs'

    def is_expired(self) -> bool:
        return self.created_at < timezone.now() - timedelta(minutes=10)

    def __str__(self):
        return f"PasswordOTP for {self.user.email} — {self.code}"


class EmailVerificationOTP(models.Model):
    user       = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='email_verification_otps'
    )
    code       = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used    = models.BooleanField(default=False)

    class Meta:
        ordering            = ['-created_at']
        verbose_name        = 'Email Verification OTP'
        verbose_name_plural = 'Email Verification OTPs'

    def is_expired(self) -> bool:
        return self.created_at < timezone.now() - timedelta(minutes=10)

    def __str__(self):
        return f"EmailOTP for {self.user.email} — {self.code}"
>>>>>>> upstream/jobportelteam
