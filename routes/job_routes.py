from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models import db
from models.job_model import Job
from models.employer_model import Employer
from datetime import datetime

job_bp = Blueprint('jobs', __name__)


@job_bp.route('/', methods=['GET'])
def list_jobs():
    """Public: list all active jobs with optional search filters."""
    keyword  = request.args.get('keyword', '')
    location = request.args.get('location', '')
    job_type = request.args.get('job_type', '')

    query = Job.query.filter_by(is_active=True)
    if keyword:
        query = query.filter(Job.title.ilike(f'%{keyword}%'))
    if location:
        query = query.filter(Job.location.ilike(f'%{location}%'))
    if job_type:
        query = query.filter(Job.job_type.ilike(f'%{job_type}%'))

    jobs = query.order_by(Job.created_at.desc()).all()
    return jsonify([j.to_dict() for j in jobs]), 200


@job_bp.route('/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = Job.query.get_or_404(job_id)
    return jsonify(job.to_dict()), 200


@job_bp.route('/', methods=['POST'])
@login_required
def create_job():
    if current_user.role not in ('employer', 'hr'):
        return jsonify({'error': 'Only employers/HR can post jobs'}), 403

    data = request.get_json()
    employer = Employer.query.filter_by(user_id=current_user.id).first()

    job = Job(
        employer_id        = employer.id if employer else None,
        title              = data.get('title', ''),
        description        = data.get('description', ''),
        location           = data.get('location', ''),
        job_type           = data.get('job_type', 'Full-time'),
        salary_min         = data.get('salary_min'),
        salary_max         = data.get('salary_max'),
        required_skills    = data.get('required_skills', ''),
        required_education = data.get('required_education', ''),
        min_experience     = data.get('min_experience', 0),
        deadline           = datetime.fromisoformat(data['deadline']) if data.get('deadline') else None,
    )
    db.session.add(job)
    db.session.commit()
    return jsonify({'message': 'Job created', 'job': job.to_dict()}), 201


@job_bp.route('/<int:job_id>', methods=['PUT'])
@login_required
def update_job(job_id):
    job = Job.query.get_or_404(job_id)
    data = request.get_json()
    for field in ('title', 'description', 'location', 'job_type', 'salary_min',
                  'salary_max', 'required_skills', 'required_education',
                  'min_experience', 'is_active'):
        if field in data:
            setattr(job, field, data[field])
    db.session.commit()
    return jsonify({'message': 'Job updated', 'job': job.to_dict()}), 200


@job_bp.route('/<int:job_id>', methods=['DELETE'])
@login_required
def delete_job(job_id):
    job = Job.query.get_or_404(job_id)
    db.session.delete(job)
    db.session.commit()
    return jsonify({'message': 'Job deleted'}), 200
