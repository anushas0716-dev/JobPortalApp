from django.db import models
from candidates.models import CandidateProfile
from jobs.models import Job


class SavedJob(models.Model):
    candidate = models.ForeignKey(
        CandidateProfile,
        on_delete=models.CASCADE,
        related_name='saved_jobs'
    )
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name='saved_by'
    )
    saved_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('candidate', 'job')
        ordering = ['-saved_at']

    def __str__(self):
        return f"{self.candidate.full_name} saved {self.job.title}"