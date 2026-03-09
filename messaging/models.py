from django.db import models
from candidates.models import CandidateProfile
from employers.models import EmployerProfile
from users.models import User

class Conversation(models.Model):
    candidate = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE)
    employer = models.ForeignKey(EmployerProfile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)