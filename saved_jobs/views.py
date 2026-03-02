from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from candidates.models import CandidateProfile
from .models import SavedJob
from .serializers import SavedJobSerializer


class SavedJobViewSet(viewsets.ModelViewSet):
    serializer_class   = SavedJobSerializer
    permission_classes = [IsAuthenticated]
    http_method_names  = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        try:
            candidate = CandidateProfile.objects.get(user=self.request.user)
            return SavedJob.objects.filter(
                candidate=candidate
            ).select_related(
                'job', 'job__company'
            )
        except CandidateProfile.DoesNotExist:
            return SavedJob.objects.none()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(
            {"detail": "Job removed from saved list."},
            status=status.HTTP_200_OK
        )