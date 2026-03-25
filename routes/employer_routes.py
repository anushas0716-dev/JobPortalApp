from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from models import db
from models.employer_model import Employer
from models.application_model import Application
from models.job_model import Job

employer_bp = Blueprint('employer', __name__)


@employer_bp.route('/profile', methods=['GET'])
@login_required
def get_profile():
    employer = Employer.query.filter_by(user_id=current_user.id).first_or_404()
    return jsonify(employer.to_dict()), 200


@employer_bp.route('/profile', methods=['PUT'])
@login_required
def update_profile():
    employer = Employer.query.filter_by(user_id=current_user.id).first_or_404()
    data = request.get_json()
    for field in ('company_name', 'industry', 'location', 'website', 'description'):
        if field in data:
            setattr(employer, field, data[field])
    db.session.commit()
    return jsonify({'message': 'Profile updated', 'employer': employer.to_dict()}), 200


@employer_bp.route('/jobs', methods=['GET'])
@login_required
def my_jobs():
    employer = Employer.query.filter_by(user_id=current_user.id).first_or_404()
    jobs = Job.query.filter_by(employer_id=employer.id).all()
    return jsonify([j.to_dict() for j in jobs]), 200


@employer_bp.route('/jobs/<int:job_id>/applications', methods=['GET'])
@login_required
def job_applications(job_id):
    """List all applications for a job owned by this employer."""
    apps = Application.query.filter_by(job_id=job_id).all()
    result = []
    for a in apps:
        d = a.to_dict()
        if a.candidate:
            d['candidate'] = a.candidate.to_dict()
        result.append(d)
    return jsonify(result), 200
