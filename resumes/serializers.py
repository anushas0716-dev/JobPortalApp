from rest_framework import serializers
from .models import Resume


class ResumeSerializer(serializers.ModelSerializer):
    candidate_name = serializers.CharField(
        source='candidate.full_name', read_only=True
    )
    file_url  = serializers.SerializerMethodField()
    file_size = serializers.SerializerMethodField()

    class Meta:
        model  = Resume
        fields = [
            'id', 'candidate', 'candidate_name',
            'title', 'file', 'file_url', 'file_size',
            'is_primary', 'uploaded_at',
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

    def validate_file(self, value):
        allowed = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
        if value.content_type not in allowed:
            raise serializers.ValidationError(
                "Only PDF, DOC, DOCX files are allowed."
            )
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError(
                "File size must be under 10MB."
            )
        return value

    def create(self, validated_data):
        from candidates.models import CandidateProfile
        candidate = CandidateProfile.objects.get(
            user=self.context['request'].user
        )
        validated_data['candidate'] = candidate
        return super().create(validated_data)