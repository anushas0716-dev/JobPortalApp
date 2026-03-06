from django.db import models
from users.models import User
from companies.models import Company

class EmployerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="employer_profile")
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="employers")
    designation = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
<<<<<<< HEAD
    updated_at = models.DateTimeField(auto_now=True)
=======
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.designation} at {self.company.name}"
>>>>>>> a997018094b650bf61e68abebfd4f4578a474923
