from flask import Blueprint, render_template, redirect, url_for, flash, request, jsonify
from flask_login import login_required, current_user
from app import db
from models.models import Application, JobPosting, CandidateProfile, Company

applicants_bp = Blueprint('applicants', __name__, url_prefix='/applicants')

APPLICATION_STATUSES = ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled',
                        'Interview Done', 'Offer Extended', 'Hired', 'Rejected']


@applicants_bp.route('/job/<int:job_id>')
@login_required
def job_applicants(job_id):
    """View all applicants for a specific job - FR-14"""
    job = JobPosting.query.filter_by(id=job_id, recruiter_id=current_user.id).first_or_404()

    # Filters
    skill_filter = request.args.get('skill', '').strip().lower()
    exp_filter = request.args.get('experience', '').strip()
    status_filter = request.args.get('status', '').strip()

    query = Application.query.filter_by(job_id=job_id).join(CandidateProfile)

    if status_filter:
        query = query.filter(Application.status == status_filter)
    if exp_filter:
        try:
            exp_val = int(exp_filter)
            query = query.filter(CandidateProfile.experience_years >= exp_val)
        except ValueError:
            pass

    applications = query.all()

    # Filter by skill (in Python since it's a text field)
    if skill_filter:
        applications = [
            a for a in applications
            if skill_filter in (a.candidate.skills or '').lower()
        ]

    return render_template('applicants/list.html',
                           job=job,
                           applications=applications,
                           APPLICATION_STATUSES=APPLICATION_STATUSES,
                           skill_filter=skill_filter,
                           exp_filter=exp_filter,
                           status_filter=status_filter)


@applicants_bp.route('/update-status/<int:app_id>', methods=['POST'])
@login_required
def update_status(app_id):
    """Update application status - FR-14"""
    application = Application.query.get_or_404(app_id)
    # Verify recruiter owns this job
    job = JobPosting.query.filter_by(id=application.job_id,
                                     recruiter_id=current_user.id).first_or_404()

    new_status = request.form.get('status', '')
    notes = request.form.get('notes', '').strip()

    if new_status in APPLICATION_STATUSES:
        application.status = new_status
    if notes:
        application.notes = notes

    db.session.commit()
    flash(f'Application status updated to "{application.status}".', 'success')
    return redirect(url_for('applicants.job_applicants', job_id=application.job_id))


@applicants_bp.route('/shortlist/<int:app_id>', methods=['POST'])
@login_required
def shortlist(app_id):
    """Shortlist a candidate - FR-14"""
    application = Application.query.get_or_404(app_id)
    JobPosting.query.filter_by(id=application.job_id,
                               recruiter_id=current_user.id).first_or_404()
    application.status = 'Shortlisted'
    db.session.commit()
    flash('Candidate shortlisted!', 'success')
    return redirect(url_for('applicants.job_applicants', job_id=application.job_id))


@applicants_bp.route('/reject/<int:app_id>', methods=['POST'])
@login_required
def reject(app_id):
    """Reject a candidate - FR-14"""
    application = Application.query.get_or_404(app_id)
    JobPosting.query.filter_by(id=application.job_id,
                               recruiter_id=current_user.id).first_or_404()
    application.status = 'Rejected'
    db.session.commit()
    flash('Candidate rejected.', 'info')
    return redirect(url_for('applicants.job_applicants', job_id=application.job_id))


@applicants_bp.route('/profile/<int:candidate_id>')
@login_required
def candidate_profile_view(candidate_id):
    """View a candidate's detailed profile"""
    candidate = CandidateProfile.query.get_or_404(candidate_id)
    return render_template('applicants/candidate_view.html', candidate=candidate)
