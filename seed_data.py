"""
seed_data.py
Run this once to populate the DB with sample data for testing.
    python seed_data.py
"""
from app import create_app
from models import db
from models.user_model import User
from models.employer_model import Employer
from models.candidate_model import Candidate
from models.job_model import Job
from models.resume_model import Resume
from models.application_model import Application

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    # ── Employer / HR user ────────────────────────────────────────────────────
    hr_user = User(email='hr@techcorp.com', role='hr')
    hr_user.set_password('password123')
    db.session.add(hr_user)
    db.session.flush()

    employer = Employer(
        user_id      = hr_user.id,
        company_name = 'TechCorp Solutions',
        industry     = 'Software',
        location     = 'Bangalore',
    )
    db.session.add(employer)
    db.session.flush()

    # ── Job Posting ───────────────────────────────────────────────────────────
    job = Job(
        employer_id        = employer.id,
        title              = 'Python Backend Developer',
        description        = 'Build REST APIs using Flask and Python.',
        location           = 'Bangalore',
        job_type           = 'Full-time',
        required_skills    = 'Python,Flask,SQL,REST API',
        required_education = 'Bachelor',
        min_experience     = 2,
        is_active          = True,
    )
    db.session.add(job)
    db.session.flush()

    # ── Candidates ────────────────────────────────────────────────────────────
    candidates_data = [
        dict(name='Arjun Sharma',   email='arjun@mail.com',   location='Bangalore',
             skills='Python,Flask,SQL,REST API,Docker', edu='Bachelor in Computer Science', exp=3),
        dict(name='Priya Nair',     email='priya@mail.com',   location='Mumbai',
             skills='Python,Django,SQL', edu='Master in Software Engineering', exp=5),
        dict(name='Ravi Kumar',     email='ravi@mail.com',    location='Bangalore',
             skills='Java,Spring Boot,SQL', edu='Bachelor in IT', exp=2),
        dict(name='Sneha Reddy',    email='sneha@mail.com',   location='Hyderabad',
             skills='Python,Flask,MongoDB', edu='Bachelor in Computer Science', exp=1),
        dict(name='Karan Mehta',    email='karan@mail.com',   location='Pune',
             skills='Python,Flask,SQL,REST API', edu='Diploma in CS', exp=2),
    ]

    for cd in candidates_data:
        c_user = User(email=cd['email'], role='candidate')
        c_user.set_password('password123')
        db.session.add(c_user)
        db.session.flush()

        candidate = Candidate(
            user_id   = c_user.id,
            full_name = cd['name'],
            email     = cd['email'],
            location  = cd['location'],
        )
        db.session.add(candidate)
        db.session.flush()

        resume = Resume(
            candidate_id        = candidate.id,
            title               = f"{cd['name']} Resume",
            skills              = cd['skills'],
            education           = cd['edu'],
            years_of_experience = cd['exp'],
            summary             = f"Experienced developer with {cd['exp']} years.",
            is_primary          = True,
        )
        db.session.add(resume)
        db.session.flush()

        application = Application(
            job_id       = job.id,
            candidate_id = candidate.id,
            resume_id    = resume.id,
            status       = 'applied',
        )
        db.session.add(application)

    db.session.commit()
    print("✅ Seed data created successfully!")
    print(f"   HR login  : hr@techcorp.com / password123")
    print(f"   Job ID    : {job.id}")
    print(f"   Test URL  : GET /api/hr/filter/{job.id}")
