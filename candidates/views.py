from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import CandidateProfile, Education, WorkExperience, ResumeSkill, Resume
from .serializers import (
    CandidateProfileSerializer, CandidateProfileListSerializer,
    EducationSerializer, WorkExperienceSerializer,
    ResumeSkillSerializer, ResumeSerializer
)


class CandidateProfileViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for CandidateProfile.

    GET    /api/candidates/              → list all
    POST   /api/candidates/              → create
    GET    /api/candidates/{id}/         → retrieve
    PUT    /api/candidates/{id}/         → full update
    PATCH  /api/candidates/{id}/         → partial update
    DELETE /api/candidates/{id}/         → delete
    GET    /api/candidates/{id}/full_profile/ → full nested profile
    """
    queryset = CandidateProfile.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['location', 'experience_years']
    search_fields = ['full_name', 'phone', 'headline', 'location']
    ordering_fields = ['created_at', 'experience_years', 'full_name']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return CandidateProfileListSerializer
        return CandidateProfileSerializer

    @action(detail=True, methods=['get'], url_path='full-profile')
    def full_profile(self, request, pk=None):
        """
        Returns complete profile with education, work experience, skills, and resumes.
        GET /api/candidates/{id}/full-profile/
        """
        candidate = self.get_object()
        serializer = CandidateProfileSerializer(candidate)
        return Response(serializer.data)


class EducationViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for Education.
    GET    /api/educations/
    POST   /api/educations/
    GET    /api/educations/{id}/
    PUT    /api/educations/{id}/
    PATCH  /api/educations/{id}/
    DELETE /api/educations/{id}/
    """
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['candidate', 'degree', 'is_current']
    ordering_fields = ['start_year', 'end_year']
    ordering = ['-end_year']


class WorkExperienceViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for WorkExperience.
    GET    /api/work-experiences/
    POST   /api/work-experiences/
    GET    /api/work-experiences/{id}/
    PUT    /api/work-experiences/{id}/
    PATCH  /api/work-experiences/{id}/
    DELETE /api/work-experiences/{id}/
    """
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['candidate', 'employment_type', 'is_current']
    search_fields = ['job_title', 'company_name', 'location']
    ordering_fields = ['start_date', 'end_date']
    ordering = ['-start_date']


class ResumeSkillViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for ResumeSkill.
    GET    /api/skills/
    POST   /api/skills/
    GET    /api/skills/{id}/
    PUT    /api/skills/{id}/
    PATCH  /api/skills/{id}/
    DELETE /api/skills/{id}/
    """
    queryset = ResumeSkill.objects.all()
    serializer_class = ResumeSkillSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['candidate', 'proficiency']
    search_fields = ['skill_name']


class ResumeViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for Resume uploads.
    GET    /api/resumes/
    POST   /api/resumes/
    GET    /api/resumes/{id}/
    PATCH  /api/resumes/{id}/
    DELETE /api/resumes/{id}/
    PATCH  /api/resumes/{id}/set-primary/  → mark as primary resume
    """
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['candidate', 'is_primary']

    @action(detail=True, methods=['patch'], url_path='set-primary')
    def set_primary(self, request, pk=None):
        """
        Mark this resume as the primary resume.
        PATCH /api/resumes/{id}/set-primary/
        """
        resume = self.get_object()
        Resume.objects.filter(candidate=resume.candidate, is_primary=True).update(is_primary=False)
        resume.is_primary = True
        resume.save()
        return Response(ResumeSerializer(resume).data, status=status.HTTP_200_OK)