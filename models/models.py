from app import db
from flask_login import UserMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class Recruiter(db.Model, UserMixin):
    """FR-12: Recruiter account linked to a company"""
    __tablename__ = 'recruiters'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    company = db.relationship('Company', backref='recruiter', uselist=False, lazy=True)
    job_postings = db.relationship('JobPosting', backref='recruiter', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<Recruiter {self.email}>'


class Company(db.Model):
    """FR-12: Company Profile Management"""
    __tablename__ = 'companies'

    id = db.Column(db.Integer, primary_key=True)
    recruiter_id = db.Column(db.Integer, db.ForeignKey('recruiters.id'), nullable=False)

    # Company profile fields
    name = db.Column(db.String(200), nullable=False)
    industry = db.Column(db.String(100), nullable=False)
    website = db.Column(db.String(255))
    company_size = db.Column(db.String(50))  # e.g. "1-10", "11-50", "51-200", etc.
    location = db.Column(db.String(200))
    description = db.Column(db.Text)
    logo_filename = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    job_postings = db.relationship('JobPosting', backref='company', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Company {self.name}>'


class JobPosting(db.Model):
    """FR-13: Job Posting Management"""
    __tablename__ = 'job_postings'

    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    recruiter_id = db.Column(db.Integer, db.ForeignKey('recruiters.id'), nullable=False)

    # Job listing fields
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    required_skills = db.Column(db.Text)       # Comma-separated
    experience_level = db.Column(db.String(50)) # Entry/Mid/Senior/Lead
    salary_min = db.Column(db.Float)
    salary_max = db.Column(db.Float)
    employment_type = db.Column(db.String(50))  # Full-time/Part-time/Contract/Internship
    work_mode = db.Column(db.String(50))        # Remote/Hybrid/On-site
    application_deadline = db.Column(db.Date)
    num_openings = db.Column(db.Integer, default=1)

    # Status: Draft / Active / Closed / Expired
    status = db.Column(db.String(20), default='Draft')

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    applications = db.relationship('Application', backref='job', lazy=True, cascade='all, delete-orphan')

    def skills_list(self):
        if self.required_skills:
            return [s.strip() for s in self.required_skills.split(',')]
        return []

    def __repr__(self):
        return f'<JobPosting {self.title}>'


class CandidateProfile(db.Model):
    """FR-15: Candidate profiles searchable by recruiters"""
    __tablename__ = 'candidate_profiles'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    location = db.Column(db.String(200))
    skills = db.Column(db.Text)             # Comma-separated
    experience_years = db.Column(db.Integer, default=0)
    current_role = db.Column(db.String(150))
    education = db.Column(db.String(200))
    resume_filename = db.Column(db.String(255))
    linkedin_url = db.Column(db.String(255))
    bio = db.Column(db.Text)
    is_open_to_work = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    applications = db.relationship('Application', backref='candidate', lazy=True)

    def skills_list(self):
        if self.skills:
            return [s.strip() for s in self.skills.split(',')]
        return []

    def __repr__(self):
        return f'<Candidate {self.full_name}>'


class Application(db.Model):
    """FR-14: Applicant Management"""
    __tablename__ = 'applications'

    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('job_postings.id'), nullable=False)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidate_profiles.id'), nullable=False)

    # Status: Applied / Shortlisted / Rejected / Interview / Hired
    status = db.Column(db.String(30), default='Applied')
    cover_letter = db.Column(db.Text)
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    notes = db.Column(db.Text)  # Recruiter notes

    def __repr__(self):
        return f'<Application job={self.job_id} candidate={self.candidate_id}>'
