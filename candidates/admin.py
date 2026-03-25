from django.contrib import admin
from .models import CandidateProfile, Education, WorkExperience, ResumeSkill, Resume


class EducationInline(admin.TabularInline):
    model = Education
    extra = 0
    fields = ['degree', 'field_of_study', 'institution', 'start_year', 'end_year', 'is_current', 'grade']


class WorkExperienceInline(admin.TabularInline):
    model = WorkExperience
    extra = 0
    fields = ['job_title', 'company_name', 'employment_type', 'start_date', 'end_date', 'is_current']


class ResumeSkillInline(admin.TabularInline):
    model = ResumeSkill
    extra = 0
    fields = ['skill_name', 'proficiency', 'years_of_experience']


class ResumeInline(admin.TabularInline):
    model = Resume
    extra = 0
    fields = ['title', 'file', 'is_primary', 'uploaded_at']
    readonly_fields = ['uploaded_at']


@admin.register(CandidateProfile)
class CandidateProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'phone', 'headline', 'location', 'experience_years', 'created_at']
    list_filter = ['location', 'experience_years']
    search_fields = ['full_name', 'phone', 'headline', 'location', 'parent_name']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    inlines = [EducationInline, WorkExperienceInline, ResumeSkillInline, ResumeInline]

    fieldsets = (
        ('Personal Info', {
            'fields': ('user', 'full_name', 'phone', 'parent_name', 'location')
        }),
        ('Professional Info', {
            'fields': ('headline', 'experience_years', 'current_salary', 'expected_salary')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['candidate', 'degree', 'field_of_study', 'institution', 'start_year', 'end_year', 'is_current']
    list_filter = ['degree', 'is_current']
    search_fields = ['candidate__full_name', 'institution', 'field_of_study']


@admin.register(WorkExperience)
class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = ['candidate', 'job_title', 'company_name', 'employment_type', 'start_date', 'end_date', 'is_current']
    list_filter = ['employment_type', 'is_current']
    search_fields = ['candidate__full_name', 'job_title', 'company_name']


@admin.register(ResumeSkill)
class ResumeSkillAdmin(admin.ModelAdmin):
    list_display = ['candidate', 'skill_name', 'proficiency', 'years_of_experience']
    list_filter = ['proficiency']
    search_fields = ['candidate__full_name', 'skill_name']


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ['candidate', 'title', 'is_primary', 'uploaded_at']
    list_filter = ['is_primary']
    search_fields = ['candidate__full_name', 'title']
    readonly_fields = ['uploaded_at']