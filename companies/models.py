from django.db import models
<<<<<<< HEAD

class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    website = models.URLField(blank=True, null=True)
=======
from django.core.validators import URLValidator

class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    website = models.URLField(blank=True, null=True, validators=[URLValidator()])
>>>>>>> a997018094b650bf61e68abebfd4f4578a474923
    industry = models.CharField(max_length=255)
    size = models.CharField(max_length=50)
    description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

<<<<<<< HEAD
=======
    class Meta:
        ordering = ['name']

>>>>>>> a997018094b650bf61e68abebfd4f4578a474923
    def __str__(self):
        return self.name