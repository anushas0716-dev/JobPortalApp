from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Job
from .serializers import JobSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import SuggestedJobSerializer
from candidates.models import CandidateProfile, ResumeSkill


class JobViewSet(viewsets.ModelViewSet):
    serializer_class   = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Job.objects.filter(is_active=True)

    def perform_create(self, serializer):
        from notifications.utils import notify_candidates_new_job
        job = serializer.save()
        notify_candidates_new_job(job)

    @action(detail=False, methods=['get'], url_path='suggested-jobs',
            permission_classes=[IsAuthenticatedOrReadOnly])
    def suggested_jobs(self, request):
        try:
            candidate = CandidateProfile.objects.get(user=request.user)
        except CandidateProfile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=404)

        candidate_skills = list(
            ResumeSkill.objects.filter(candidate=candidate)
            .values_list('skill_name', flat=True)
        )
        candidate_skills_lower = [s.lower() for s in candidate_skills]
        candidate_location     = (candidate.location or "").lower().strip()
        candidate_experience   = candidate.experience_years or 0

        scored_jobs = []
        for job in Job.objects.filter(is_active=True, status='open').prefetch_related('jobskill_set__skill'):
            job_skills = list(job.jobskill_set.values_list('skill__name', flat=True))
            job_skills_lower = [s.lower() for s in job_skills]
            job_location = (job.location or "").lower().strip()

            matched_skills = [s for s in job_skills_lower if s in candidate_skills_lower]
            score = 0
            reasons = []

            if matched_skills:
                score += len(matched_skills) * 10
                reasons.append(f"Matched {len(matched_skills)} skill(s): {', '.join(matched_skills)}")

            if candidate_location and job_location and (
                candidate_location in job_location or job_location in candidate_location
            ):
                score += 5
                reasons.append(f"Location match: {job.location}")

            exp_points = min(candidate_experience, 10)
            if exp_points > 0:
                score += exp_points
                reasons.append(f"Experience: {candidate_experience} yr(s)")

            if score > 0:
                scored_jobs.append({
                    'job': job,
                    'score': score,
                    'reasons': reasons,
                    'matched_skills': matched_skills
                })

        scored_jobs.sort(key=lambda x: x['score'], reverse=True)
        top_jobs = scored_jobs[:20]

        results = []
        for item in top_jobs:
            job = item['job']
            data = JobSerializer(job, context={'request': request}).data
            data['match_score']    = item['score']
            data['match_reasons']  = item['reasons']
            data['matched_skills'] = item['matched_skills']
            results.append(data)

        return Response({
            "count": len(results),
            "candidate_skills": candidate_skills,
            "candidate_location": candidate.location,
            "candidate_experience": candidate_experience,
            "results": results
        })