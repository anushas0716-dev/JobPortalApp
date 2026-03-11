from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import CandidateProfile, Education, WorkExperience, ResumeSkill, Resume
from .serializers import (
    CandidateProfileSerializer, CandidateFullProfileSerializer,
    EducationSerializer, WorkExperienceSerializer,
    ResumeSkillSerializer, ResumeSerializer
)


class CandidateProfileViewSet(viewsets.ModelViewSet):
    serializer_class = CandidateProfileSerializer
    permission_classes = [IsAuthenticated]

    # ✅ Only return logged-in user's profile
    def get_queryset(self):
        return CandidateProfile.objects.filter(user=self.request.user)

    # ✅ Automatically assign logged-in user when creating profile
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # ✅ Optional: Prevent updating another user's profile
    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    # ✅ GET /api/candidates/<id>/full-profile/
    @action(detail=True, methods=['get'], url_path='full-profile')
    def full_profile(self, request, pk=None):
        profile = self.get_object()
        serializer = CandidateFullProfileSerializer(
            profile,
            context={'request': request}
        )
        return Response(serializer.data)

    # ✅ GET /api/candidates/me/
    @action(detail=False, methods=['get'], url_path='me')
    def me(self, request):
        try:
            profile = CandidateProfile.objects.get(user=request.user)
            serializer = CandidateFullProfileSerializer(
                profile,
                context={'request': request}
            )
            return Response(serializer.data)
        except CandidateProfile.DoesNotExist:
            return Response(
                {"detail": "Profile not found."},
                status=status.HTTP_404_NOT_FOUND
            )

class EducationViewSet(viewsets.ModelViewSet):
    serializer_class   = EducationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        candidate = CandidateProfile.objects.get(user=self.request.user)
        return Education.objects.filter(candidate=candidate)

    def perform_create(self, serializer):
        candidate = CandidateProfile.objects.get(user=self.request.user)
        serializer.save(candidate=candidate)


class WorkExperienceViewSet(viewsets.ModelViewSet):
    serializer_class   = WorkExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        candidate = CandidateProfile.objects.get(user=self.request.user)
        return WorkExperience.objects.filter(candidate=candidate)

    def perform_create(self, serializer):
        candidate = CandidateProfile.objects.get(user=self.request.user)
        serializer.save(candidate=candidate)

class ResumeSkillViewSet(viewsets.ModelViewSet):
    serializer_class   = ResumeSkillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        candidate = CandidateProfile.objects.get(user=self.request.user)
        return ResumeSkill.objects.filter(candidate=candidate)

    def perform_create(self, serializer):
        from notifications.utils import notify_candidate_new_matching_jobs
        candidate = CandidateProfile.objects.get(user=self.request.user)
        serializer.save(candidate=candidate)
        notify_candidate_new_matching_jobs(candidate)


class CandidateResumeViewSet(viewsets.ModelViewSet):
    serializer_class   = ResumeSerializer
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser]

    def get_queryset(self):
        candidate = CandidateProfile.objects.get(user=self.request.user)
        return Resume.objects.filter(candidate=candidate)

    def perform_create(self, serializer):
        candidate = CandidateProfile.objects.get(user=self.request.user)
        serializer.save(candidate=candidate)

    @action(detail=True, methods=['patch'], url_path='set-primary')
    def set_primary(self, request, pk=None):
        """PATCH /api/candidate-resumes/<id>/set-primary/"""
        resume = self.get_object()
        Resume.objects.filter(
            candidate=resume.candidate, is_primary=True
        ).update(is_primary=False)
        resume.is_primary = True
        resume.save()
        return Response(
            ResumeSerializer(resume, context={'request': request}).data
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.file.delete(save=False)
        instance.delete()
        return Response(
            {"detail": "Resume deleted."},
            status=status.HTTP_200_OK
        )