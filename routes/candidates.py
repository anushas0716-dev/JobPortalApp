from flask import Blueprint, render_template, request
from flask_login import login_required
from models.models import CandidateProfile

candidates_bp = Blueprint('candidates', __name__, url_prefix='/candidates')


@candidates_bp.route('/search')
@login_required
def search():
    """FR-15: Recruiter searches candidate profiles using filters"""
    skill_filter = request.args.get('skill', '').strip()
    exp_min = request.args.get('exp_min', '').strip()
    exp_max = request.args.get('exp_max', '').strip()
    location_filter = request.args.get('location', '').strip()
    open_to_work = request.args.get('open_to_work', '')
    keyword = request.args.get('keyword', '').strip()

    query = CandidateProfile.query

    if open_to_work == '1':
        query = query.filter(CandidateProfile.is_open_to_work == True)

    if exp_min:
        try:
            query = query.filter(CandidateProfile.experience_years >= int(exp_min))
        except ValueError:
            pass

    if exp_max:
        try:
            query = query.filter(CandidateProfile.experience_years <= int(exp_max))
        except ValueError:
            pass

    if location_filter:
        query = query.filter(
            CandidateProfile.location.ilike(f'%{location_filter}%')
        )

    candidates = query.all()

    # Python-level skill and keyword filtering (text search)
    if skill_filter:
        skill_lower = skill_filter.lower()
        candidates = [c for c in candidates
                      if skill_lower in (c.skills or '').lower()]

    if keyword:
        kw = keyword.lower()
        candidates = [c for c in candidates
                      if kw in (c.full_name or '').lower()
                      or kw in (c.current_role or '').lower()
                      or kw in (c.bio or '').lower()]

    return render_template('candidates/search.html',
                           candidates=candidates,
                           skill_filter=skill_filter,
                           exp_min=exp_min,
                           exp_max=exp_max,
                           location_filter=location_filter,
                           open_to_work=open_to_work,
                           keyword=keyword,
                           total=len(candidates))
