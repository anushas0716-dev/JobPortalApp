from django.db import models
from candidates.models import CandidateProfile

class Resume(models.Model):
    candidate = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE, related_name="resumes")
    file = models.FileField(upload_to="resumes/")
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)