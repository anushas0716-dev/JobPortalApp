from django.contrib import admin
from .models import Job, JobSkill

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display  = ['title', 'company', 'location', 'employment_type', 'status', 'is_active', 'created_at']
    list_filter   = ['status', 'is_active', 'employment_type']
    search_fields = ['title', 'company__name', 'location']

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['employer'].required = False
        return form

@admin.register(JobSkill)
class JobSkillAdmin(admin.ModelAdmin):
    list_display = ['job', 'skill']