from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django.db.models import Q

from .models import Job, JobSkill
from .serializers import JobSerializer, SuggestedJobSerializer
from candidates.models import CandidateProfile, ResumeSkill


class JobViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset           = Job.objects.filter(is_active=True)
    serializer_class   = JobSerializer

class SuggestedJobsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            candidate = CandidateProfile.objects.get(user=request.user)
        except CandidateProfile.DoesNotExist:
            return Response(
                {"detail": "Candidate profile not found. Please create your profile first."},
                status=status.HTTP_404_NOT_FOUND
            )

        candidate_skills = list(
            ResumeSkill.objects.filter(candidate=candidate)
            .values_list('skill_name', flat=True)
        )
        candidate_skills_lower = [s.lower() for s in candidate_skills]

        candidate_location    = (candidate.location or "").lower().strip()
        candidate_experience  = candidate.experience_years or 0

        jobs = Job.objects.filter(
            is_active=True,
            status='open'
        ).select_related('company').prefetch_related('jobskill_set__skill')

        scored_jobs = []

        for job in jobs:
            score        = 0
            reasons      = []
            matched_skills = []

            job_skills = list(
                job.jobskill_set.values_list('skill__name', flat=True)
            )
            job_skills_lower = [s.lower() for s in job_skills]

            for skill in job_skills_lower:
                if skill in candidate_skills_lower:
                    score += 10
                    matched_skills.append(skill.title())

            if matched_skills:
                reasons.append(
                    f"Matched {len(matched_skills)} skill(s): {', '.join(matched_skills)}"
                )

            job_location = (job.location or "").lower().strip()
            if candidate_location and job_location:
                if (candidate_location in job_location or
                    job_location in candidate_location):
                    score += 5
                    reasons.append(f"Location match: {job.location}")

            if candidate_experience > 0:
                if candidate_experience >= 1:
                    score += min(candidate_experience, 10)
                    reasons.append(
                        f"Experience: {candidate_experience} yr(s)"
                    )

            if score > 0:
                job.match_score    = score
                job.match_reasons  = reasons
                job.matched_skills = matched_skills
                scored_jobs.append(job)

        scored_jobs.sort(key=lambda j: j.match_score, reverse=True)

        top_jobs = scored_jobs[:20]

        serializer = SuggestedJobSerializer(
            top_jobs,
            many=True,
            context={'request': request}
        )

        return Response({
            "count":             len(top_jobs),
            "candidate_skills":  candidate_skills,
            "candidate_location": candidate.location,
            "candidate_experience": candidate_experience,
            "results":           serializer.data
        })
