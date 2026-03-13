from django.db import models
from django.core.validators import URLValidator

class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    website = models.URLField(blank=True, null=True, validators=[URLValidator()])
    industry = models.CharField(max_length=255)
    size = models.CharField(max_length=50)
    description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name