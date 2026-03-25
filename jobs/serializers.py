from rest_framework import serializers
from .models import Job, JobSkill


class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    skills = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company_name', 'location',
            'employment_type', 'salary_min', 'salary_max',
            'status', 'is_active', 'created_at', 'skills'
        ]

    def get_skills(self, obj):
        return list(obj.jobskill_set.values_list('skill__name', flat=True))


class SuggestedJobSerializer(serializers.ModelSerializer):
    company_name   = serializers.CharField(source='company.name', read_only=True)
    skills         = serializers.SerializerMethodField()
    match_score    = serializers.SerializerMethodField()
    match_reasons  = serializers.SerializerMethodField()
    matched_skills = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company_name', 'location',
            'employment_type', 'salary_min', 'salary_max',
            'status', 'is_active', 'created_at',
            'skills', 'match_score', 'match_reasons', 'matched_skills'
        ]

    def get_skills(self, obj):
        return list(obj.jobskill_set.values_list('skill__name', flat=True))

    def get_match_score(self, obj):
        return obj.match_score if hasattr(obj, 'match_score') else 0

    def get_match_reasons(self, obj):
        return obj.match_reasons if hasattr(obj, 'match_reasons') else []

    def get_matched_skills(self, obj):
        return obj.matched_skills if hasattr(obj, 'matched_skills') else []