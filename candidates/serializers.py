from rest_framework import serializers
from .models import CandidateProfile, Education, WorkExperience, ResumeSkill, Resume


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'
        read_only_fields = ['created_at']


class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = '__all__'
        read_only_fields = ['created_at']

    def validate(self, data):
        if not data.get('is_current') and not data.get('end_date'):
            raise serializers.ValidationError("Provide end_date or mark as current job.")
        if data.get('end_date') and data.get('start_date'):
            if data['end_date'] < data['start_date']:
                raise serializers.ValidationError("end_date cannot be before start_date.")
        return data


class ResumeSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeSkill
        fields = '__all__'
        read_only_fields = ['created_at']


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'
        read_only_fields = ['uploaded_at']


class CandidateProfileSerializer(serializers.ModelSerializer):
    candidate_resumes = ResumeSerializer(many=True, read_only=True)
    work_experiences = WorkExperienceSerializer(many=True, read_only=True)
    skills = ResumeSkillSerializer(many=True, read_only=True)
    resumes = ResumeSerializer(many=True, read_only=True)

    class Meta:
        model = CandidateProfile
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class CandidateProfileListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list view"""
    class Meta:
        model = CandidateProfile
        fields = ['id', 'full_name', 'phone', 'headline', 'location', 'experience_years', 'created_at']
