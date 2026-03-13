import os
from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from models import db
from models.resume_model import Resume
from models.candidate_model import Candidate

resume_bp = Blueprint('resumes', __name__)


def allowed_file(filename):
    allowed = current_app.config.get('ALLOWED_EXTENSIONS', {'pdf', 'doc', 'docx'})
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed


@resume_bp.route('/', methods=['POST'])
@login_required
def upload_resume():
    if current_user.role != 'candidate':
        return jsonify({'error': 'Only candidates can upload resumes'}), 403

    candidate = Candidate.query.filter_by(user_id=current_user.id).first()
    if not candidate:
        return jsonify({'error': 'Candidate profile not found'}), 404

    file_url = None
    if 'file' in request.files:
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            upload_dir = current_app.config.get('UPLOAD_FOLDER', 'static/resumes')
            os.makedirs(upload_dir, exist_ok=True)
            save_path = os.path.join(upload_dir, f"{candidate.id}_{filename}")
            file.save(save_path)
            file_url = save_path

    data = request.form if request.content_type and 'multipart' in request.content_type else (request.get_json() or {})

    resume = Resume(
        candidate_id        = candidate.id,
        title               = data.get('title', ''),
        skills              = data.get('skills', ''),
        education           = data.get('education', ''),
        years_of_experience = float(data.get('years_of_experience', 0)),
        summary             = data.get('summary', ''),
        file_url            = file_url,
        is_primary          = data.get('is_primary', 'false').lower() == 'true',
    )
    db.session.add(resume)
    db.session.commit()
    return jsonify({'message': 'Resume uploaded', 'resume': resume.to_dict()}), 201


@resume_bp.route('/my', methods=['GET'])
@login_required
def my_resumes():
    if current_user.role != 'candidate':
        return jsonify({'error': f'You are logged in as "{current_user.role}". This endpoint is for candidates only.'}), 403

    candidate = Candidate.query.filter_by(user_id=current_user.id).first()
    if not candidate:
        return jsonify({'error': 'Candidate profile not found.'}), 404

    resumes = Resume.query.filter_by(candidate_id=candidate.id).all()
    return jsonify([r.to_dict() for r in resumes]), 200


@resume_bp.route('/<int:resume_id>', methods=['PUT'])
@login_required
def update_resume(resume_id):
    resume = Resume.query.get_or_404(resume_id)
    data = request.get_json()
    for field in ('title', 'skills', 'education', 'years_of_experience', 'summary', 'is_primary'):
        if field in data:
            setattr(resume, field, data[field])
    db.session.commit()
    return jsonify({'message': 'Resume updated', 'resume': resume.to_dict()}), 200


@resume_bp.route('/<int:resume_id>', methods=['DELETE'])
@login_required
def delete_resume(resume_id):
    resume = Resume.query.get_or_404(resume_id)
    db.session.delete(resume)
    db.session.commit()
    return jsonify({'message': 'Resume deleted'}), 200
