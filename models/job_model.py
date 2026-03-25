from models import db
from datetime import datetime


class Job(db.Model):
    __tablename__ = 'jobs'

    id                 = db.Column(db.Integer, primary_key=True)
    employer_id        = db.Column(db.Integer, db.ForeignKey('employers.id'), nullable=False)
    title              = db.Column(db.String(200), nullable=False)
    description        = db.Column(db.Text)
    location           = db.Column(db.String(150))
    job_type           = db.Column(db.String(50))          # Full-time, Part-time, Remote
    salary_min         = db.Column(db.Float)
    salary_max         = db.Column(db.Float)
    required_skills    = db.Column(db.Text)                # Comma-separated: "Python,Flask,SQL"
    required_education = db.Column(db.String(100))         # "Bachelor", "Master", "PhD"
    min_experience     = db.Column(db.Integer, default=0)  # Years
    is_active          = db.Column(db.Boolean, default=True)
    deadline           = db.Column(db.DateTime)
    created_at         = db.Column(db.DateTime, default=datetime.utcnow)

    applications = db.relationship('Application', backref='job', lazy=True)

    def to_dict(self):
        return {
            'id':                 self.id,
            'employer_id':        self.employer_id,
            'title':              self.title,
            'description':        self.description,
            'location':           self.location,
            'job_type':           self.job_type,
            'salary_min':         self.salary_min,
            'salary_max':         self.salary_max,
            'required_skills':    self.required_skills,
            'required_education': self.required_education,
            'min_experience':     self.min_experience,
            'is_active':          self.is_active,
            'deadline':           self.deadline.isoformat() if self.deadline else None,
            'created_at':         self.created_at.isoformat(),
        }
