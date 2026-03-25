from models import db
from datetime import datetime


class Resume(db.Model):
    __tablename__ = 'resumes'

    id                  = db.Column(db.Integer, primary_key=True)
    candidate_id        = db.Column(db.Integer, db.ForeignKey('candidates.id'), nullable=False)
    title               = db.Column(db.String(200))           # e.g. "Full Stack Developer Resume"
    skills              = db.Column(db.Text)                  # Comma-separated: "Python,React,SQL"
    education           = db.Column(db.String(100))           # "Bachelor in CS", "Master in IT"
    years_of_experience = db.Column(db.Float, default=0)
    summary             = db.Column(db.Text)
    file_url            = db.Column(db.String(300))           # Path to uploaded resume file
    is_primary          = db.Column(db.Boolean, default=False)
    created_at          = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at          = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id':                  self.id,
            'candidate_id':        self.candidate_id,
            'title':               self.title,
            'skills':              self.skills,
            'education':           self.education,
            'years_of_experience': self.years_of_experience,
            'summary':             self.summary,
            'file_url':            self.file_url,
            'is_primary':          self.is_primary,
            'created_at':          self.created_at.isoformat(),
        }
