from app import app, db, Recruiter, Company, JobPosting, CandidateProfile, Application
from datetime import date, timedelta

with app.app_context():
    db.drop_all()
    db.create_all()

    r = Recruiter(name='Priya Sharma', email='priya@techcorp.com')
    r.set_password('password123')
    db.session.add(r)
    db.session.flush()

    company = Company(
        recruiter_id=r.id, name='TechCorp Solutions', industry='Technology',
        website='https://techcorp.com', company_size='51-200',
        location='Bangalore, Karnataka',
        description='We build world-class SaaS products for enterprise clients.'
    )
    db.session.add(company)
    db.session.flush()

    job1 = JobPosting(
        company_id=company.id, recruiter_id=r.id,
        title='Backend Python Developer',
        description='We are looking for a skilled Python developer to build REST APIs.',
        required_skills='Python, Flask, Django, PostgreSQL, REST API, Docker',
        experience_level='Mid Level', salary_min=600000, salary_max=1200000,
        employment_type='Full-time', work_mode='Hybrid',
        application_deadline=date.today() + timedelta(days=30),
        num_openings=2, status='Active'
    )
    job2 = JobPosting(
        company_id=company.id, recruiter_id=r.id,
        title='Frontend React Developer',
        description='Join our frontend team to build modern, responsive user interfaces.',
        required_skills='React, JavaScript, TypeScript, CSS, HTML',
        experience_level='Entry Level', salary_min=400000, salary_max=800000,
        employment_type='Full-time', work_mode='Remote',
        application_deadline=date.today() + timedelta(days=20),
        num_openings=3, status='Active'
    )
    job3 = JobPosting(
        company_id=company.id, recruiter_id=r.id,
        title='DevOps Engineer',
        description='Responsible for CI/CD pipelines and cloud infrastructure.',
        required_skills='AWS, Kubernetes, Docker, CI/CD, Terraform, Linux',
        experience_level='Senior Level', salary_min=1200000, salary_max=2000000,
        employment_type='Full-time', work_mode='On-site',
        num_openings=1, status='Draft'
    )
    db.session.add_all([job1, job2, job3])
    db.session.flush()

    candidates = [
        CandidateProfile(full_name='Arjun Mehta', email='arjun@mail.com', phone='9876543210',
                         location='Bangalore', skills='Python, Flask, PostgreSQL, Docker, REST API',
                         experience_years=3, current_role='Software Developer',
                         education='B.Tech CS - VTU 2021', is_open_to_work=True,
                         bio='Passionate backend developer with 3 years of Python experience.'),
        CandidateProfile(full_name='Sneha Patel', email='sneha@mail.com', phone='9123456780',
                         location='Mumbai', skills='React, TypeScript, JavaScript, CSS, GraphQL',
                         experience_years=2, current_role='Frontend Developer',
                         education='B.E. IT - Mumbai University 2022', is_open_to_work=True,
                         bio='Creative front-end developer building beautiful web interfaces.'),
        CandidateProfile(full_name='Rohit Kumar', email='rohit@mail.com', phone='9845671230',
                         location='Pune', skills='AWS, Kubernetes, Docker, Terraform, CI/CD, Python',
                         experience_years=5, current_role='DevOps Engineer',
                         education='M.Tech - IIT Pune 2019', is_open_to_work=False,
                         bio='DevOps expert with 5 years of cloud infrastructure experience.'),
        CandidateProfile(full_name='Kavitha Nair', email='kavitha@mail.com',
                         location='Hyderabad', skills='Python, Django, Machine Learning, TensorFlow',
                         experience_years=4, current_role='ML Engineer',
                         education='M.Sc Data Science - BITS 2020', is_open_to_work=True,
                         bio='ML engineer specializing in NLP and computer vision.'),
        CandidateProfile(full_name='Rahul Singh', email='rahul@mail.com',
                         location='Bangalore', skills='React, Node.js, MongoDB, Express, JavaScript',
                         experience_years=1, current_role='Junior Developer',
                         education='B.Tech - NIT 2023', is_open_to_work=True,
                         bio='Fresh graduate eager to contribute to impactful products.'),
    ]
    db.session.add_all(candidates)
    db.session.flush()

    apps = [
        Application(job_id=job1.id, candidate_id=candidates[0].id,
                    status='Shortlisted', cover_letter='I am very interested in this position.'),
        Application(job_id=job1.id, candidate_id=candidates[3].id,
                    status='Applied', cover_letter='My Python + ML background is perfect.'),
        Application(job_id=job2.id, candidate_id=candidates[1].id,
                    status='Interview Scheduled', cover_letter='React is my primary stack.'),
        Application(job_id=job2.id, candidate_id=candidates[4].id,
                    status='Applied', cover_letter='Looking to grow as a React developer.'),
        Application(job_id=job1.id, candidate_id=candidates[2].id,
                    status='Rejected', cover_letter='I have worked on large scale backend systems.'),
    ]
    db.session.add_all(apps)
    db.session.commit()

    print("✅ Seed data loaded successfully!")
    print("   Login: priya@techcorp.com / password123")