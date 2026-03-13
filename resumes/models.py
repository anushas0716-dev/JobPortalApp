from django.db import models
from candidates.models import CandidateProfile


class Resume(models.Model):
    candidate   = models.ForeignKey(
        CandidateProfile,
        on_delete=models.CASCADE,
        related_name="resumes"
    )
    title       = models.CharField(max_length=255, default='My Resume')
    file        = models.FileField(upload_to="resumes/%Y/%m/")
    is_default  = models.BooleanField(default=False)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.candidate.full_name} — {self.title}"

    def save(self, *args, **kwargs):
        if self.is_default:
            Resume.objects.filter(
                candidate=self.candidate, is_default=True
            ).update(is_default=False)
        super().save(*args, **kwargs)