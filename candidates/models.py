from django.db import models
from users.models import User

class CandidateProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="candidate_profile")
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    headline = models.CharField(max_length=255, blank=True)
    experience_years = models.IntegerField(default=0)
    current_salary = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    expected_salary = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    location = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name