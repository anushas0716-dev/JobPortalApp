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
    company_name = serializers.CharField(source='company.name', read_only=True)
    skills = serializers.SerializerMethodField()
    match_score = serializers.IntegerField(read_only=True, default=0)
    match_reasons = serializers.ListField(
        child=serializers.CharField(), read_only=True, default=list
    )
    matched_skills = serializers.ListField(
        child=serializers.CharField(), read_only=True, default=list
    )

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company_name', 'location',
            'employment_type', 'salary_min', 'salary_max',
            'status', 'is_active', 'created_at', 'skills',
            'match_score', 'match_reasons', 'matched_skills'
        ]

    def get_skills(self, obj):
        return list(obj.jobskill_set.values_list('skill__name', flat=True))