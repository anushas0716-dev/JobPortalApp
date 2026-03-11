from models import db
from datetime import datetime


class Candidate(db.Model):
    __tablename__ = 'candidates'

    id         = db.Column(db.Integer, primary_key=True)
    user_id    = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    full_name  = db.Column(db.String(150), nullable=False)
    email      = db.Column(db.String(150), nullable=False)
    phone      = db.Column(db.String(20))
    location   = db.Column(db.String(150))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user         = db.relationship('User', backref='candidate', uselist=False)
    resumes      = db.relationship('Resume', backref='candidate', lazy=True)
    applications = db.relationship('Application', backref='candidate', lazy=True)

    def to_dict(self):
        return {
            'id':        self.id,
            'full_name': self.full_name,
            'email':     self.email,
            'phone':     self.phone,
            'location':  self.location,
        }
