from rest_framework import serializers
from .models import CandidateProfile, Education, WorkExperience, ResumeSkill, Resume


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Education
        fields = [
            'id', 'degree', 'field_of_study', 'institution',
            'start_year', 'end_year', 'is_current', 'grade', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = WorkExperience
        fields = [
            'id', 'job_title', 'company_name', 'employment_type',
            'location', 'start_date', 'end_date', 'is_current',
            'description', 'salary', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ResumeSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ResumeSkill
        fields = [
            'id', 'skill_name', 'proficiency',
            'years_of_experience', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ResumeSerializer(serializers.ModelSerializer):
    file_url  = serializers.SerializerMethodField()
    file_size = serializers.SerializerMethodField()

    class Meta:
        model  = Resume
        fields = [
            'id', 'title', 'file', 'file_url',
            'file_size', 'is_primary', 'uploaded_at'
        ]
        read_only_fields = ['id', 'uploaded_at']

    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        return None

    def get_file_size(self, obj):
        try:
            size = obj.file.size
            if size < 1024:
                return f"{size} B"
            elif size < 1024 * 1024:
                return f"{size // 1024} KB"
            else:
                return f"{size / (1024*1024):.1f} MB"
        except Exception:
            return "Unknown"


class CandidateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model  = CandidateProfile
        fields = [
            'id', 'full_name', 'phone', 'headline',
            'experience_years', 'current_salary', 'expected_salary',
            'location', 'parent_name', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class CandidateFullProfileSerializer(serializers.ModelSerializer):
    educations       = EducationSerializer(many=True, read_only=True)
    work_experiences = WorkExperienceSerializer(many=True, read_only=True)
    skills           = ResumeSkillSerializer(many=True, read_only=True)
    candidate_resumes = ResumeSerializer(many=True, read_only=True)

    class Meta:
        model  = CandidateProfile
        fields = [
            'id', 'full_name', 'phone', 'headline',
            'experience_years', 'current_salary', 'expected_salary',
            'location', 'parent_name', 'created_at', 'updated_at',
            'educations', 'work_experiences', 'skills', 'candidate_resumes'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']