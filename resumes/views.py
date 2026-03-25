from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from candidates.models import CandidateProfile
from .models import Resume
from .serializers import ResumeSerializer


class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class   = ResumeSerializer
    permission_classes = [IsAuthenticated]
    parser_classes     = [MultiPartParser, FormParser]
    http_method_names  = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        try:
            candidate = CandidateProfile.objects.get(
                user=self.request.user
            )
            return Resume.objects.filter(candidate=candidate)
        except CandidateProfile.DoesNotExist:
            return Resume.objects.none()

    @action(detail=True, methods=['patch'], url_path='set-default')
    def set_default(self, request, pk=None):
        """PATCH /api/resumes/<id>/set-default/"""
        resume = self.get_object()
        Resume.objects.filter(
            candidate=resume.candidate, is_default=True
        ).update(is_default=False)
        resume.is_default = True
        resume.save()
        return Response(
            ResumeSerializer(resume, context={'request': request}).data
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.file.delete(save=False)
        instance.delete()
        return Response(
            {"detail": "Resume deleted successfully."},
            status=status.HTTP_200_OK
        )