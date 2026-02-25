from flask import Flask, render_template, redirect, url_for, flash, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'recruiter-secret-key-2024'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jobportal.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'uploads', 'logos')
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

class Recruiter(db.Model, UserMixin):
    __tablename__ = 'recruiters'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    company = db.relationship('Company', backref='recruiter', uselist=False, lazy=True)
    job_postings = db.relationship('JobPosting', backref='recruiter', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Company(db.Model):
    __tablename__ = 'companies'
    id = db.Column(db.Integer, primary_key=True)
    recruiter_id = db.Column(db.Integer, db.ForeignKey('recruiters.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    industry = db.Column(db.String(100), nullable=False)
    website = db.Column(db.String(255))
    company_size = db.Column(db.String(50))
    location = db.Column(db.String(200))
    description = db.Column(db.Text)
    logo_filename = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    job_postings = db.relationship('JobPosting', backref='company', lazy=True, cascade='all, delete-orphan')


class JobPosting(db.Model):
    __tablename__ = 'job_postings'
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    recruiter_id = db.Column(db.Integer, db.ForeignKey('recruiters.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    required_skills = db.Column(db.Text)
    experience_level = db.Column(db.String(50))
    salary_min = db.Column(db.Float)
    salary_max = db.Column(db.Float)
    employment_type = db.Column(db.String(50))
    work_mode = db.Column(db.String(50))
    application_deadline = db.Column(db.Date)
    num_openings = db.Column(db.Integer, default=1)
    status = db.Column(db.String(20), default='Draft')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    applications = db.relationship('Application', backref='job', lazy=True, cascade='all, delete-orphan')

    def skills_list(self):
        return [s.strip() for s in self.required_skills.split(',')] if self.required_skills else []


class CandidateProfile(db.Model):
    __tablename__ = 'candidate_profiles'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    location = db.Column(db.String(200))
    skills = db.Column(db.Text)
    experience_years = db.Column(db.Integer, default=0)
    current_role = db.Column(db.String(150))
    education = db.Column(db.String(200))
    linkedin_url = db.Column(db.String(255))
    bio = db.Column(db.Text)
    is_open_to_work = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    applications = db.relationship('Application', backref='candidate', lazy=True)

    def skills_list(self):
        return [s.strip() for s in self.skills.split(',')] if self.skills else []


class Application(db.Model):
    __tablename__ = 'applications'
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('job_postings.id'), nullable=False)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidate_profiles.id'), nullable=False)
    status = db.Column(db.String(30), default='Applied')
    cover_letter = db.Column(db.Text)
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)
    notes = db.Column(db.Text)


@login_manager.user_loader
def load_user(user_id):
    return Recruiter.query.get(int(user_id))


with app.app_context():
    db.create_all()

EXPERIENCE_LEVELS   = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Manager', 'Director']
EMPLOYMENT_TYPES    = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']
WORK_MODES          = ['Remote', 'Hybrid', 'On-site']
JOB_STATUSES        = ['Draft', 'Active', 'Closed', 'Expired']
APPLICATION_STATUSES= ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled',
                       'Interview Done', 'Offer Extended', 'Hired', 'Rejected']
COMPANY_SIZES       = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
INDUSTRIES          = ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail',
                       'Manufacturing', 'Media', 'Consulting', 'Government', 'Other']

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    if request.method == 'POST':
        name     = request.form.get('name', '').strip()
        email    = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        confirm  = request.form.get('confirm_password', '')
        if not name or not email or not password:
            flash('All fields are required.', 'danger')
        elif password != confirm:
            flash('Passwords do not match.', 'danger')
        elif Recruiter.query.filter_by(email=email).first():
            flash('Email already registered.', 'danger')
        else:
            r = Recruiter(name=name, email=email)
            r.set_password(password)
            db.session.add(r)
            db.session.commit()
            flash('Account created! Please log in.', 'success')
            return redirect(url_for('login'))
    return render_template('auth/register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    if request.method == 'POST':
        email    = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        remember = request.form.get('remember') == 'on'
        recruiter = Recruiter.query.filter_by(email=email).first()
        if recruiter and recruiter.check_password(password):
            login_user(recruiter, remember=remember)
            return redirect(request.args.get('next') or url_for('dashboard'))
        flash('Invalid email or password.', 'danger')
    return render_template('auth/login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully.', 'info')
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    company = Company.query.filter_by(recruiter_id=current_user.id).first()
    total_jobs = active_jobs = total_applications = 0
    if company:
        total_jobs         = JobPosting.query.filter_by(company_id=company.id).count()
        active_jobs        = JobPosting.query.filter_by(company_id=company.id, status='Active').count()
        total_applications = Application.query.join(JobPosting).filter(JobPosting.company_id == company.id).count()
    return render_template('company/dashboard.html', company=company,
                           total_jobs=total_jobs, active_jobs=active_jobs,
                           total_applications=total_applications)

@app.route('/company/profile', methods=['GET', 'POST'])
@login_required
def company_profile():
    company = Company.query.filter_by(recruiter_id=current_user.id).first()
    if request.method == 'POST':
        name         = request.form.get('name', '').strip()
        industry     = request.form.get('industry', '').strip()
        website      = request.form.get('website', '').strip()
        company_size = request.form.get('company_size', '').strip()
        location     = request.form.get('location', '').strip()
        description  = request.form.get('description', '').strip()
        if not name or not industry:
            flash('Company name and industry are required.', 'danger')
            return render_template('company/profile.html', company=company,
                                   COMPANY_SIZES=COMPANY_SIZES, INDUSTRIES=INDUSTRIES)
        logo_filename = company.logo_filename if company else None
        if 'logo' in request.files:
            file = request.files['logo']
            if file and file.filename:
                ext = file.filename.rsplit('.', 1)[-1].lower()
                if ext in {'png','jpg','jpeg','gif','webp'}:
                    import uuid
                    unique_name = f"{uuid.uuid4().hex}.{ext}"
                    upload_path = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'])
                    os.makedirs(upload_path, exist_ok=True)
                    file.save(os.path.join(upload_path, unique_name))
                    logo_filename = unique_name
        if company:
            company.name=name; company.industry=industry; company.website=website
            company.company_size=company_size; company.location=location
            company.description=description; company.logo_filename=logo_filename
        else:
            company = Company(recruiter_id=current_user.id, name=name, industry=industry,
                              website=website, company_size=company_size, location=location,
                              description=description, logo_filename=logo_filename)
            db.session.add(company)
        db.session.commit()
        flash('Company profile saved!', 'success')
        return redirect(url_for('company_profile'))
    return render_template('company/profile.html', company=company,
                           COMPANY_SIZES=COMPANY_SIZES, INDUSTRIES=INDUSTRIES)

@app.route('/jobs')
@login_required
def list_jobs():
    company = Company.query.filter_by(recruiter_id=current_user.id).first()
    if not company:
        flash('Please create a company profile first.', 'warning')
        return redirect(url_for('company_profile'))
    status_filter = request.args.get('status', '')
    query = JobPosting.query.filter_by(company_id=company.id)
    if status_filter in JOB_STATUSES:
        query = query.filter_by(status=status_filter)
    jobs = query.order_by(JobPosting.created_at.desc()).all()
    return render_template('jobs/list.html', jobs=jobs,
                           status_filter=status_filter, JOB_STATUSES=JOB_STATUSES)

@app.route('/jobs/create', methods=['GET', 'POST'])
@login_required
def create_job():
    company = Company.query.filter_by(recruiter_id=current_user.id).first()
    if not company:
        flash('Please create a company profile first.', 'warning')
        return redirect(url_for('company_profile'))
    if request.method == 'POST':
        title       = request.form.get('title', '').strip()
        description = request.form.get('description', '').strip()
        if not title or not description:
            flash('Title and description are required.', 'danger')
        else:
            salary_min   = request.form.get('salary_min') or None
            salary_max   = request.form.get('salary_max') or None
            deadline_str = request.form.get('application_deadline', '')
            deadline = None
            if deadline_str:
                try: deadline = datetime.strptime(deadline_str, '%Y-%m-%d').date()
                except ValueError: pass
            job = JobPosting(
                company_id=company.id, recruiter_id=current_user.id,
                title=title, description=description,
                required_skills=request.form.get('required_skills','').strip(),
                experience_level=request.form.get('experience_level',''),
                salary_min=float(salary_min) if salary_min else None,
                salary_max=float(salary_max) if salary_max else None,
                employment_type=request.form.get('employment_type',''),
                work_mode=request.form.get('work_mode',''),
                application_deadline=deadline,
                num_openings=int(request.form.get('num_openings', 1)),
                status=request.form.get('status','Draft')
            )
            db.session.add(job)
            db.session.commit()
            flash(f'Job "{title}" created!', 'success')
            return redirect(url_for('list_jobs'))
    return render_template('jobs/form.html', job=None,
                           EXPERIENCE_LEVELS=EXPERIENCE_LEVELS, EMPLOYMENT_TYPES=EMPLOYMENT_TYPES,
                           WORK_MODES=WORK_MODES, JOB_STATUSES=JOB_STATUSES)

@app.route('/jobs/<int:job_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_job(job_id):
    job = JobPosting.query.filter_by(id=job_id, recruiter_id=current_user.id).first_or_404()
    if request.method == 'POST':
        job.title            = request.form.get('title','').strip()
        job.description      = request.form.get('description','').strip()
        job.required_skills  = request.form.get('required_skills','').strip()
        job.experience_level = request.form.get('experience_level','')
        job.employment_type  = request.form.get('employment_type','')
        job.work_mode        = request.form.get('work_mode','')
        job.num_openings     = int(request.form.get('num_openings', 1))
        job.status           = request.form.get('status', job.status)
        salary_min = request.form.get('salary_min') or None
        salary_max = request.form.get('salary_max') or None
        job.salary_min = float(salary_min) if salary_min else None
        job.salary_max = float(salary_max) if salary_max else None
        deadline_str = request.form.get('application_deadline','')
        if deadline_str:
            try: job.application_deadline = datetime.strptime(deadline_str, '%Y-%m-%d').date()
            except ValueError: pass
        db.session.commit()
        flash('Job updated!', 'success')
        return redirect(url_for('list_jobs'))
    return render_template('jobs/form.html', job=job,
                           EXPERIENCE_LEVELS=EXPERIENCE_LEVELS, EMPLOYMENT_TYPES=EMPLOYMENT_TYPES,
                           WORK_MODES=WORK_MODES, JOB_STATUSES=JOB_STATUSES)

@app.route('/jobs/<int:job_id>/delete', methods=['POST'])
@login_required
def delete_job(job_id):
    job = JobPosting.query.filter_by(id=job_id, recruiter_id=current_user.id).first_or_404()
    title = job.title
    db.session.delete(job)
    db.session.commit()
    flash(f'Job "{title}" deleted.', 'success')
    return redirect(url_for('list_jobs'))

@app.route('/jobs/<int:job_id>/close', methods=['POST'])
@login_required
def close_job(job_id):
    job = JobPosting.query.filter_by(id=job_id, recruiter_id=current_user.id).first_or_404()
    job.status = 'Closed'
    db.session.commit()
    flash(f'Job "{job.title}" closed.', 'info')
    return redirect(url_for('list_jobs'))

@app.route('/jobs/<int:job_id>/detail')
@login_required
def job_detail(job_id):
    job = JobPosting.query.filter_by(id=job_id, recruiter_id=current_user.id).first_or_404()
    return render_template('jobs/detail.html', job=job)

@app.route('/applicants/job/<int:job_id>')
@login_required
def job_applicants(job_id):
    job = JobPosting.query.filter_by(id=job_id, recruiter_id=current_user.id).first_or_404()
    skill_filter  = request.args.get('skill', '').strip().lower()
    exp_filter    = request.args.get('experience', '').strip()
    status_filter = request.args.get('status', '').strip()
    query = Application.query.filter_by(job_id=job_id).join(CandidateProfile)
    if status_filter:
        query = query.filter(Application.status == status_filter)
    if exp_filter:
        try: query = query.filter(CandidateProfile.experience_years >= int(exp_filter))
        except ValueError: pass
    applications = query.all()
    if skill_filter:
        applications = [a for a in applications if skill_filter in (a.candidate.skills or '').lower()]
    return render_template('applicants/list.html', job=job, applications=applications,
                           APPLICATION_STATUSES=APPLICATION_STATUSES,
                           skill_filter=skill_filter, exp_filter=exp_filter,
                           status_filter=status_filter)

@app.route('/applicants/update-status/<int:app_id>', methods=['POST'])
@login_required
def update_status(app_id):
    application = Application.query.get_or_404(app_id)
    new_status = request.form.get('status', '')
    notes      = request.form.get('notes', '').strip()
    if new_status in APPLICATION_STATUSES:
        application.status = new_status
    if notes:
        application.notes = notes
    db.session.commit()
    flash(f'Status updated to "{application.status}".', 'success')
    return redirect(url_for('job_applicants', job_id=application.job_id))

@app.route('/applicants/shortlist/<int:app_id>', methods=['POST'])
@login_required
def shortlist(app_id):
    application = Application.query.get_or_404(app_id)
    application.status = 'Shortlisted'
    db.session.commit()
    flash('Candidate shortlisted!', 'success')
    return redirect(url_for('job_applicants', job_id=application.job_id))

@app.route('/applicants/reject/<int:app_id>', methods=['POST'])
@login_required
def reject(app_id):
    application = Application.query.get_or_404(app_id)
    application.status = 'Rejected'
    db.session.commit()
    flash('Candidate rejected.', 'info')
    return redirect(url_for('job_applicants', job_id=application.job_id))

@app.route('/applicants/profile/<int:candidate_id>')
@login_required
def candidate_profile_view(candidate_id):
    candidate = CandidateProfile.query.get_or_404(candidate_id)
    return render_template('applicants/candidate_view.html', candidate=candidate)

@app.route('/candidates/search')
@login_required
def candidate_search():
    skill_filter    = request.args.get('skill', '').strip()
    exp_min         = request.args.get('exp_min', '').strip()
    exp_max         = request.args.get('exp_max', '').strip()
    location_filter = request.args.get('location', '').strip()
    open_to_work    = request.args.get('open_to_work', '')
    keyword         = request.args.get('keyword', '').strip()
    query = CandidateProfile.query
    if open_to_work == '1':
        query = query.filter(CandidateProfile.is_open_to_work == True)
    if exp_min:
        try: query = query.filter(CandidateProfile.experience_years >= int(exp_min))
        except ValueError: pass
    if exp_max:
        try: query = query.filter(CandidateProfile.experience_years <= int(exp_max))
        except ValueError: pass
    if location_filter:
        query = query.filter(CandidateProfile.location.ilike(f'%{location_filter}%'))
    candidates = query.all()
    if skill_filter:
        candidates = [c for c in candidates if skill_filter.lower() in (c.skills or '').lower()]
    if keyword:
        kw = keyword.lower()
        candidates = [c for c in candidates if kw in (c.full_name or '').lower()
                      or kw in (c.current_role or '').lower() or kw in (c.bio or '').lower()]
    return render_template('candidates/search.html', candidates=candidates,
                           skill_filter=skill_filter, exp_min=exp_min, exp_max=exp_max,
                           location_filter=location_filter, open_to_work=open_to_work,
                           keyword=keyword, total=len(candidates))

if __name__ == '__main__':
    app.run(debug=True)