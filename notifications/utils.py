from .models import Notification
from candidates.models import CandidateProfile, ResumeSkill
from jobs.models import Job, JobSkill


def notify_candidate_new_matching_jobs(candidate):
    candidate_skills = list(
        ResumeSkill.objects.filter(candidate=candidate)
        .values_list('skill_name', flat=True)
    )
    candidate_skills_lower = [s.lower() for s in candidate_skills]
    candidate_location     = (candidate.location or "").lower().strip()

    if not candidate_skills_lower:
        return

    matching_jobs = []
    jobs = Job.objects.filter(is_active=True, status='open').prefetch_related('jobskill_set__skill')

    for job in jobs:
        job_skills_lower = [
            s.lower() for s in
            job.jobskill_set.values_list('skill__name', flat=True)
        ]
        matched = [s for s in job_skills_lower if s in candidate_skills_lower]

        if matched:
            matching_jobs.append({
                'job':     job,
                'matched': matched
            })

    if not matching_jobs:
        return

    job_titles = ", ".join([m['job'].title for m in matching_jobs[:3]])
    more = len(matching_jobs) - 3
    message = f"We found {len(matching_jobs)} job(s) matching your skills: {job_titles}"
    if more > 0:
        message += f" and {more} more."

    Notification.objects.create(
        user    = candidate.user,
        title   = "🎯 New Job Matches Found!",
        message = message
    )


def notify_candidates_new_job(job):

    job_skills = list(
        job.jobskill_set.values_list('skill__name', flat=True)
    )
    job_skills_lower = [s.lower() for s in job_skills]
    job_location     = (job.location or "").lower().strip()

    if not job_skills_lower:
        return

    candidates = CandidateProfile.objects.select_related('user').prefetch_related('skills')

    for candidate in candidates:
        candidate_skills_lower = [
            s.lower() for s in
            ResumeSkill.objects.filter(candidate=candidate)
            .values_list('skill_name', flat=True)
        ]

        matched = [s for s in job_skills_lower if s in candidate_skills_lower]

        if matched:
            candidate_location = (candidate.location or "").lower().strip()
            location_match = (
                candidate_location and job_location and
                (candidate_location in job_location or job_location in candidate_location)
            )

            matched_str = ", ".join([s.title() for s in matched])
            message = (
                f"A new job '{job.title}' at {job.company.name} matches your skills: {matched_str}."
            )
            if location_match:
                message += f" Location: {job.location}."

            Notification.objects.create(
                user    = candidate.user,
                title   = f"💼 New Job: {job.title}",
                message = message
            )
