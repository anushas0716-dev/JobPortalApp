from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import SavedJob

class SavedJobSerializer(serializers.ModelSerializer):
    job_title      = serializers.CharField(source='job.title', read_only=True)
    job_company    = serializers.CharField(source='job.company.name', read_only=True)
    job_location   = serializers.CharField(source='job.location', read_only=True)
    job_type       = serializers.CharField(source='job.employment_type', read_only=True)
    job_salary_min = serializers.DecimalField(source='job.salary_min', max_digits=10, decimal_places=2, read_only=True)
    job_salary_max = serializers.DecimalField(source='job.salary_max', max_digits=10, decimal_places=2, read_only=True)
    job_status     = serializers.CharField(source='job.status', read_only=True)
    job_skills     = serializers.SerializerMethodField()

    class Meta:
        model  = SavedJob
        fields = [
            'id', 'job', 'job_title', 'job_company', 'job_location',
            'job_type', 'job_salary_min', 'job_salary_max',
            'job_status', 'job_skills', 'notes', 'saved_at',
        ]
        read_only_fields = ['id', 'saved_at']

    def get_job_skills(self, obj):
        return list(obj.job.jobskill_set.values_list('skill__name', flat=True))

    def create(self, validated_data):
        from candidates.models import CandidateProfile
        candidate = CandidateProfile.objects.get(user=self.context['request'].user)
        validated_data['candidate'] = candidate

        # Prevent duplicate saved jobs
        if SavedJob.objects.filter(candidate=candidate, job=validated_data['job']).exists():
            raise ValidationError({"detail": "Job already saved."})

        return super().create(validated_data)