from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import login_required, current_user
from app import db
from models.models import Company, JobPosting
from datetime import datetime, date

jobs_bp = Blueprint('jobs', __name__, url_prefix='/jobs')

EXPERIENCE_LEVELS = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Manager', 'Director']
EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']
WORK_MODES = ['Remote', 'Hybrid', 'On-site']
JOB_STATUSES = ['Draft', 'Active', 'Closed', 'Expired']


def get_recruiter_company():
    return Company.query.filter_by(recruiter_id=current_user.id).first()


@jobs_bp.route('/')
@login_required
def list_jobs():
    company = get_recruiter_company()
    if not company:
        flash('Please create a company profile first.', 'warning')
        return redirect(url_for('company.profile'))

    status_filter = request.args.get('status', '')
    query = JobPosting.query.filter_by(company_id=company.id)
    if status_filter and status_filter in JOB_STATUSES:
        query = query.filter_by(status=status_filter)

    jobs = query.order_by(JobPosting.created_at.desc()).all()
    return render_template('jobs/list.html', jobs=jobs,
                           status_filter=status_filter, JOB_STATUSES=JOB_STATUSES)


@jobs_bp.route('/create', methods=['GET', 'POST'])
@login_required
def create_job():
    company = get_recruiter_company()
    if not company:
        flash('Please create a company profile first.', 'warning')
        return redirect(url_for('company.profile'))

    if request.method == 'POST':
        title = request.form.get('title', '').strip()
        description = request.form.get('description', '').strip()
        required_skills = request.form.get('required_skills', '').strip()
        experience_level = request.form.get('experience_level', '')
        salary_min = request.form.get('salary_min') or None
        salary_max = request.form.get('salary_max') or None
        employment_type = request.form.get('employment_type', '')
        work_mode = request.form.get('work_mode', '')
        deadline_str = request.form.get('application_deadline', '')
        num_openings = request.form.get('num_openings', 1)
        status = request.form.get('status', 'Draft')

        if not title or not description:
            flash('Job title and description are required.', 'danger')
            return render_template('jobs/form.html', job=None,
                                   EXPERIENCE_LEVELS=EXPERIENCE_LEVELS,
                                   EMPLOYMENT_TYPES=EMPLOYMENT_TYPES,
                                   WORK_MODES=WORK_MODES,
                                   JOB_STATUSES=JOB_STATUSES)

        deadline = None
        if deadline_str:
            try:
                deadline = datetime.strptime(deadline_str, '%Y-%m-%d').date()
            except ValueError:
                flash('Invalid deadline date format.', 'danger')

        job = JobPosting(
            company_id=company.id,
            recruiter_id=current_user.id,
            title=title,
            description=description,
            required_skills=required_skills,
            experience_level=experience_level,
            salary_min=float(salary_min) if salary_min else None,
            salary_max=float(salary_max) if salary_max else None,
            employment_type=employment_type,
            work_mode=work_mode,
            application_deadline=deadline,
            num_openings=int(num_openings),
            status=status
        )
        db.session.add(job)
        db.session.commit()
        flash(f'Job "{title}" created successfully!', 'success')
        return redirect(url_for('jobs.list_jobs'))

    return render_template('jobs/form.html', job=None,
                           EXPERIENCE_LEVELS=EXPERIENCE_LEVELS,
                           EMPLOYMENT_TYPES=EMPLOYMENT_TYPES,
                           WORK_MODES=WORK_MODES,
                           JOB_STATUSES=JOB_STATUSES)


@jobs_bp.route('/<int:job_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_job(job_id):
    job = JobPosting.query.filter_by(id=job_id, recruiter_id=current_user.id).first_or_404()

    if request.method == 'POST':
        job.title = request.form.get('title', '').strip()
        job.description = request.form.get('description', '').strip()
        job.required_skills = request.form.get('required_skills', '').strip()
        job.experience_level = request.form.get('experience_level', '')
        salary_min = request.form.get('salary_min') or None
        salary_max = request.form.get('salary_max') or None
        job.salary_min = float(salary_min) if salary_min else None
        job.salary_max = float(salary_max) if salary_max else None
        job.employment_type = request.form.get('employment_type', '')
        job.work_mode = request.form.get('work_mode', '')
        deadline_str = request.form.get('application_deadline', '')
        job.num_openings = int(request.form.get('num_openings', 1))
        job.status = request.form.get('status', job.status)

        if deadline_str:
            try:
                job.application_deadline = datetime.strptime(deadline_str, '%Y-%m-%d').date()
            except ValueError:
                flash('Invalid deadline date format.', 'danger')

        db.session.commit()
        flash('Job posting updated successfully!', 'success')
        return redirect(url_for('jobs.list_jobs'))

    return render_template('jobs/form.html', job=job,
                           EXPERIENCE_LEVELS=EXPERIENCE_LEVELS,
                           EMPLOYMENT_TYPES=EMPLOYMENT_TYPES,
                           WORK_MODES=WORK_MODES,
                           JOB_STATUSES=JOB_STATUSES)


@jobs_bp.route('/<int:job_id>/delete', methods=['POST'])
@login_required
def delete_job(job_id):
    job = JobPosting.query.filter_by(id=job_id, recruiter_id=current_user.id).first_or_404()
    title = job.title
    db.session.delete(job)
    db.session.commit()
    flash(f'Job "{title}" deleted.', 'success')
    return redirect(url_for('jobs.list_jobs'))


@jobs_bp.route('/<int:job_id>/close', methods=['POST'])
@login_required
def close_job(job_id):
    job = JobPosting.query.filter_by(id=job_id, recruiter_id=current_user.id).first_or_404()
    job.status = 'Closed'
    db.session.commit()
    flash(f'Job "{job.title}" has been closed.', 'info')
    return redirect(url_for('jobs.list_jobs'))


@jobs_bp.route('/<int:job_id>/detail')
@login_required
def job_detail(job_id):
    job = JobPosting.query.filter_by(id=job_id, recruiter_id=current_user.id).first_or_404()
    return render_template('jobs/detail.html', job=job)
