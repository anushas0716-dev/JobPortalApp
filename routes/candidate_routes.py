from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models import db
from models.application_model import Application
from models.candidate_model import Candidate
from models.resume_model import Resume

candidate_bp = Blueprint('candidate', __name__)


@candidate_bp.route('/apply', methods=['POST'])
@login_required
def apply_job():
    if current_user.role != 'candidate':
        return jsonify({'error': 'Only candidates can apply'}), 403

    data = request.get_json()
    job_id    = data.get('job_id')
    resume_id = data.get('resume_id')

    if not job_id or not resume_id:
        return jsonify({'error': 'job_id and resume_id are required'}), 400

    candidate = Candidate.query.filter_by(user_id=current_user.id).first()
    if not candidate:
        return jsonify({'error': 'Candidate profile not found'}), 404

    existing = Application.query.filter_by(
        job_id=job_id, candidate_id=candidate.id
    ).first()
    if existing:
        return jsonify({'error': 'Already applied to this job'}), 409

    app = Application(
        job_id       = job_id,
        candidate_id = candidate.id,
        resume_id    = resume_id,
        status       = 'applied',
    )
    db.session.add(app)
    db.session.commit()
    return jsonify({'message': 'Application submitted', 'application': app.to_dict()}), 201


@candidate_bp.route('/applications', methods=['GET'])
@login_required
def my_applications():
    if current_user.role != 'candidate':
        return jsonify({'error': 'Only candidates can view their applications'}), 403

    candidate = Candidate.query.filter_by(user_id=current_user.id).first()
    if not candidate:
        return jsonify({'error': 'Candidate profile not found. Please register as a candidate.'}), 404

    apps = Application.query.filter_by(candidate_id=candidate.id).all()
    return jsonify([a.to_dict() for a in apps]), 200


@candidate_bp.route('/profile', methods=['GET'])
@login_required
def get_profile():
    if current_user.role != 'candidate':
        return jsonify({'error': f'You are logged in as "{current_user.role}". This endpoint is for candidates only.'}), 403

    candidate = Candidate.query.filter_by(user_id=current_user.id).first()
    if not candidate:
        return jsonify({'error': 'Candidate profile not found.'}), 404

    return jsonify(candidate.to_dict()), 200


@candidate_bp.route('/profile', methods=['PUT'])
@login_required
def update_profile():
    if current_user.role != 'candidate':
        return jsonify({'error': 'Only candidates can update their profile'}), 403

    candidate = Candidate.query.filter_by(user_id=current_user.id).first()
    if not candidate:
        return jsonify({'error': 'Candidate profile not found'}), 404

    data = request.get_json()
    for field in ('full_name', 'phone', 'location'):
        if field in data:
            setattr(candidate, field, data[field])
    db.session.commit()
    return jsonify({'message': 'Profile updated', 'candidate': candidate.to_dict()}), 200
