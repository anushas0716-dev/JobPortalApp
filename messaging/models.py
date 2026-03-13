from django.db import models
from candidates.models import CandidateProfile
from employers.models import EmployerProfile
from users.models import User

class Conversation(models.Model):
    candidate = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE)
    employer = models.ForeignKey(EmployerProfile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['candidate', 'employer']
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['candidate']),
            models.Index(fields=['employer']),
            models.Index(fields=['-created_at']),
        ]

    def __str__(self):
        return f"Conversation: {self.candidate.full_name} - {self.employer.company.name}"


class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['conversation', 'created_at']),
            models.Index(fields=['sender']),
            models.Index(fields=['is_read']),
        ]
        ordering = ['created_at']