from django.contrib import admin
from .models import Resume


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display  = ('candidate', 'title', 'is_default', 'created_at')
    list_filter   = ('is_default',)
    search_fields = ('candidate__full_name', 'title')
    ordering      = ('-created_at',)