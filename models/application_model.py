from models import db
from datetime import datetime


class Application(db.Model):
    __tablename__ = 'applications'

    id           = db.Column(db.Integer, primary_key=True)
    job_id       = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    resume_id    = db.Column(db.Integer, db.ForeignKey('resumes.id'), nullable=False)
    # Status flow: applied → reviewed → shortlisted → rejected → hired
    status       = db.Column(db.String(30), default='applied')
    hr_notes     = db.Column(db.Text)
    applied_at   = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at   = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    resume = db.relationship('Resume', backref='applications')

    def to_dict(self):
        return {
            'id':           self.id,
            'job_id':       self.job_id,
            'candidate_id': self.candidate_id,
            'resume_id':    self.resume_id,
            'status':       self.status,
            'hr_notes':     self.hr_notes,
            'applied_at':   self.applied_at.isoformat(),
        }
