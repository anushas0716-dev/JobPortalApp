"""
HR Resume Filter API
====================
Allows HR to filter and rank applicant resumes for any job posting
based on the company's requirements.

Endpoints
---------
GET  /api/hr/filter/<job_id>
     Main filter: returns ranked list of applicants with match scores.

     Query params:
       min_score         (int)   Minimum match %, default 0
       required_skills   (str)   Override/add skills, comma-separated
       min_experience    (int)   Override minimum years of experience
       education         (str)   Override required education keyword
       location          (str)   Filter candidates by location keyword
       sort_by           (str)   'score' | 'experience' | 'name', default 'score'
       page              (int)   Page number, default 1
       per_page          (int)   Results per page, default 10

GET  /api/hr/score/<resume_id>/<job_id>
     Score one specific resume against one job.

PATCH /api/hr/application/<application_id>/status
     HR updates the status of an application (shortlist / reject / hire).
"""

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models import db
from models.job_model import Job
from models.resume_model import Resume
from models.candidate_model import Candidate
from models.application_model import Application

hr_filter_bp = Blueprint('hr_filter', __name__)

# ─────────────────────────────────────────────────────────────────────────────
# Education hierarchy used for scoring
# ─────────────────────────────────────────────────────────────────────────────
EDUCATION_RANK = {
    'high school': 1,
    'diploma':     2,
    'associate':   2,
    'bachelor':    3,
    'undergraduate': 3,
    'master':      4,
    'mba':         4,
    'phd':         5,
    'doctorate':   5,
}


def _edu_level(text: str) -> int:
    """Return the highest education rank found in a text string."""
    text = (text or '').lower()
    best = 0
    for keyword, rank in EDUCATION_RANK.items():
        if keyword in text:
            best = max(best, rank)
    return best


def calculate_match_score(resume: Resume, job: Job) -> dict:
    """
    Score a resume against a job's requirements.
    Returns a dict with:
      total_score     (float 0-100)
      skills_score    (float 0-50)
      exp_score       (float 0-30)
      edu_score       (float 0-20)
      matched_skills  (list)
      missing_skills  (list)
    """
    skills_score   = 0.0
    exp_score      = 0.0
    edu_score      = 0.0
    matched_skills = []
    missing_skills = []

    # ── Skills (50 pts) ──────────────────────────────────────────────────────
    if job.required_skills:
        job_skills    = {s.strip().lower() for s in job.required_skills.split(',') if s.strip()}
        resume_skills = {s.strip().lower() for s in (resume.skills or '').split(',') if s.strip()}

        matched_skills = sorted(job_skills & resume_skills)
        missing_skills = sorted(job_skills - resume_skills)

        if job_skills:
            skills_score = (len(matched_skills) / len(job_skills)) * 50

    # ── Experience (30 pts) ──────────────────────────────────────────────────
    req_exp     = job.min_experience or 0
    resume_exp  = resume.years_of_experience or 0
    if req_exp == 0:
        exp_score = 30.0
    elif resume_exp >= req_exp:
        exp_score = 30.0
    elif resume_exp >= req_exp - 1:
        exp_score = 18.0   # partial credit: within 1 year
    elif resume_exp >= req_exp - 2:
        exp_score = 8.0    # partial credit: within 2 years

    # ── Education (20 pts) ───────────────────────────────────────────────────
    required_edu_level = _edu_level(job.required_education or '')
    resume_edu_level   = _edu_level(resume.education or '')

    if required_edu_level == 0:
        edu_score = 20.0
    elif resume_edu_level >= required_edu_level:
        edu_score = 20.0
    elif resume_edu_level == required_edu_level - 1:
        edu_score = 10.0   # one level below required

    total_score = round(skills_score + exp_score + edu_score, 2)

    return {
        'total_score':    total_score,
        'skills_score':   round(skills_score, 2),
        'exp_score':      round(exp_score, 2),
        'edu_score':      round(edu_score, 2),
        'matched_skills': matched_skills,
        'missing_skills': missing_skills,
    }


# ─────────────────────────────────────────────────────────────────────────────
# MAIN FILTER ENDPOINT
# ─────────────────────────────────────────────────────────────────────────────
@hr_filter_bp.route('/filter/<int:job_id>', methods=['GET'])
@login_required
def filter_resumes(job_id):
    """
    HR filters and ranks all applicants for a specific job.
    Only accessible by users with role 'hr' or 'employer'.
    """
    if current_user.role not in ('hr', 'employer'):
        return jsonify({'error': 'Access denied. HR or Employer role required.'}), 403

    job = Job.query.get_or_404(job_id)

    # ── Read HR's filter overrides ────────────────────────────────────────────
    override_skills    = request.args.get('required_skills', '').strip()
    override_exp       = request.args.get('min_experience', type=int)
    override_edu       = request.args.get('education', '').strip()
    location_filter    = request.args.get('location', '').strip().lower()
    min_score          = request.args.get('min_score', 0, type=int)
    sort_by            = request.args.get('sort_by', 'score')
    page               = request.args.get('page', 1, type=int)
    per_page           = request.args.get('per_page', 10, type=int)

    # Build a temporary scoring job object with HR overrides applied
    class ScoringJob:
        required_skills    = override_skills    or job.required_skills
        required_education = override_edu       or job.required_education
        min_experience     = override_exp       if override_exp is not None else job.min_experience

    scoring_job = ScoringJob()

    # ── Fetch applications for this job ───────────────────────────────────────
    applications_query = (
        Application.query
        .filter_by(job_id=job_id)
        .join(Resume, Application.resume_id == Resume.id)
        .join(Candidate, Application.candidate_id == Candidate.id)
    )

    # Location filter (applied at DB level)
    if location_filter:
        applications_query = applications_query.filter(
            Candidate.location.ilike(f'%{location_filter}%')
        )

    # Min experience filter (applied at DB level)
    if override_exp is not None and override_exp > 0:
        applications_query = applications_query.filter(
            Resume.years_of_experience >= override_exp
        )

    applications = applications_query.all()

    # ── Score each applicant ──────────────────────────────────────────────────
    results = []
    for app_record in applications:
        resume    = Resume.query.get(app_record.resume_id)
        candidate = Candidate.query.get(app_record.candidate_id)

        if not resume or not candidate:
            continue

        score_data = calculate_match_score(resume, scoring_job)

        if score_data['total_score'] < min_score:
            continue

        verdict = (
            'Strong Match'   if score_data['total_score'] >= 70 else
            'Moderate Match' if score_data['total_score'] >= 40 else
            'Weak Match'
        )

        results.append({
            'application_id':      app_record.id,
            'application_status':  app_record.status,
            'candidate_id':        candidate.id,
            'candidate_name':      candidate.full_name,
            'candidate_email':     candidate.email,
            'candidate_location':  candidate.location,
            'resume_id':           resume.id,
            'resume_title':        resume.title,
            'skills':              resume.skills,
            'years_of_experience': resume.years_of_experience,
            'education':           resume.education,
            'resume_file_url':     resume.file_url,
            'match_score':         score_data['total_score'],
            'score_breakdown': {
                'skills':     score_data['skills_score'],
                'experience': score_data['exp_score'],
                'education':  score_data['edu_score'],
            },
            'matched_skills':      score_data['matched_skills'],
            'missing_skills':      score_data['missing_skills'],
            'verdict':             verdict,
        })

    # ── Sort ──────────────────────────────────────────────────────────────────
    if sort_by == 'score':
        results.sort(key=lambda x: x['match_score'], reverse=True)
    elif sort_by == 'experience':
        results.sort(key=lambda x: (x['years_of_experience'] or 0), reverse=True)
    elif sort_by == 'name':
        results.sort(key=lambda x: x['candidate_name'].lower())

    # ── Paginate ──────────────────────────────────────────────────────────────
    total  = len(results)
    start  = (page - 1) * per_page
    paged  = results[start: start + per_page]

    return jsonify({
        'status':       'success',
        'job_id':       job_id,
        'job_title':    job.title,
        'total_applicants':  total,
        'page':         page,
        'per_page':     per_page,
        'total_pages':  max(1, -(-total // per_page)),   # ceiling division
        'filters_applied': {
            'required_skills':    scoring_job.required_skills,
            'min_experience':     scoring_job.min_experience,
            'required_education': scoring_job.required_education,
            'location':           location_filter or None,
            'min_score':          min_score,
            'sort_by':            sort_by,
        },
        'results': paged,
    }), 200


# ─────────────────────────────────────────────────────────────────────────────
# SCORE ONE RESUME AGAINST A JOB
# ─────────────────────────────────────────────────────────────────────────────
@hr_filter_bp.route('/score/<int:resume_id>/<int:job_id>', methods=['GET'])
@login_required
def score_resume(resume_id, job_id):
    """
    HR manually checks how well one specific resume matches a job.
    Useful for checking a candidate not yet in the applicant pool.
    """
    if current_user.role not in ('hr', 'employer'):
        return jsonify({'error': 'Access denied'}), 403

    resume    = Resume.query.get_or_404(resume_id)
    job       = Job.query.get_or_404(job_id)
    candidate = Candidate.query.get(resume.candidate_id)

    score_data = calculate_match_score(resume, job)

    return jsonify({
        'status':       'success',
        'resume_id':    resume_id,
        'job_id':       job_id,
        'job_title':    job.title,
        'candidate_name':  candidate.full_name if candidate else 'Unknown',
        'candidate_email': candidate.email     if candidate else '',
        'match_score':  score_data['total_score'],
        'score_breakdown': {
            'skills':     score_data['skills_score'],
            'experience': score_data['exp_score'],
            'education':  score_data['edu_score'],
        },
        'matched_skills':   score_data['matched_skills'],
        'missing_skills':   score_data['missing_skills'],
        'years_of_experience':  resume.years_of_experience,
        'required_experience':  job.min_experience,
        'education':            resume.education,
        'required_education':   job.required_education,
        'verdict': (
            'Strong Match'   if score_data['total_score'] >= 70 else
            'Moderate Match' if score_data['total_score'] >= 40 else
            'Weak Match'
        ),
    }), 200


# ─────────────────────────────────────────────────────────────────────────────
# UPDATE APPLICATION STATUS (shortlist / reject / hire)
# ─────────────────────────────────────────────────────────────────────────────
@hr_filter_bp.route('/application/<int:application_id>/status', methods=['PATCH'])
@login_required
def update_application_status(application_id):
    """
    HR updates the status of an application after reviewing the resume.

    Valid statuses:
      applied → reviewed → shortlisted → rejected → hired
    """
    if current_user.role not in ('hr', 'employer'):
        return jsonify({'error': 'Access denied'}), 403

    VALID_STATUSES = ('applied', 'reviewed', 'shortlisted', 'rejected', 'hired')

    data       = request.get_json()
    new_status = data.get('status', '').lower()
    hr_notes   = data.get('hr_notes', '')

    if new_status not in VALID_STATUSES:
        return jsonify({
            'error': f"Invalid status. Must be one of: {', '.join(VALID_STATUSES)}"
        }), 400

    app_record = Application.query.get_or_404(application_id)
    app_record.status   = new_status
    if hr_notes:
        app_record.hr_notes = hr_notes

    db.session.commit()

    return jsonify({
        'status':  'success',
        'message': f'Application {application_id} marked as "{new_status}"',
        'application': app_record.to_dict(),
    }), 200


# ─────────────────────────────────────────────────────────────────────────────
# SHORTLIST SUMMARY — all shortlisted candidates for a job
# ─────────────────────────────────────────────────────────────────────────────
@hr_filter_bp.route('/shortlist/<int:job_id>', methods=['GET'])
@login_required
def get_shortlisted(job_id):
    """Returns all candidates already marked as 'shortlisted' for a job."""
    if current_user.role not in ('hr', 'employer'):
        return jsonify({'error': 'Access denied'}), 403

    apps = Application.query.filter_by(job_id=job_id, status='shortlisted').all()
    result = []
    for a in apps:
        candidate = Candidate.query.get(a.candidate_id)
        resume    = Resume.query.get(a.resume_id)
        result.append({
            'application_id': a.id,
            'candidate':      candidate.to_dict() if candidate else {},
            'resume':         resume.to_dict()    if resume    else {},
            'hr_notes':       a.hr_notes,
            'applied_at':     a.applied_at.isoformat(),
        })
    return jsonify({'job_id': job_id, 'shortlisted': result}), 200
