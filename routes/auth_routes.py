from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from models import db
from models.user_model import User
from models.candidate_model import Candidate
from models.employer_model import Employer

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    required = ['email', 'password', 'role']
    if not all(k in data for k in required):
        return jsonify({'error': 'email, password, and role are required'}), 400

    role = data['role']
    if role not in ('candidate', 'employer', 'hr'):
        return jsonify({'error': "role must be 'candidate', 'employer', or 'hr'"}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 409

    user = User(email=data['email'], role=role)
    user.set_password(data['password'])
    db.session.add(user)
    db.session.flush()  # get user.id before committing

    if role == 'candidate':
        candidate = Candidate(
            user_id   = user.id,
            full_name = data.get('full_name', ''),
            email     = data['email'],
            phone     = data.get('phone', ''),
            location  = data.get('location', ''),
        )
        db.session.add(candidate)

    elif role == 'employer':
        employer = Employer(
            user_id      = user.id,
            company_name = data.get('company_name', ''),
            industry     = data.get('industry', ''),
            location     = data.get('location', ''),
        )
        db.session.add(employer)

    db.session.commit()
    return jsonify({'message': 'Registration successful', 'user': user.to_dict()}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    if not user or not user.check_password(data.get('password', '')):
        return jsonify({'error': 'Invalid email or password'}), 401
    login_user(user)
    return jsonify({'message': 'Login successful', 'user': user.to_dict()}), 200


@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200


@auth_bp.route('/me', methods=['GET'])
@login_required
def me():
    return jsonify(current_user.to_dict()), 200
