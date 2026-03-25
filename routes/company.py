from flask import Blueprint, render_template, redirect, url_for, flash, request, current_app
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from app import db
from models.models import Company, JobPosting
import os
import uuid

company_bp = Blueprint('company', __name__, url_prefix='/company')

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@company_bp.route('/dashboard')
@login_required
def dashboard():
    company = Company.query.filter_by(recruiter_id=current_user.id).first()
    total_jobs = 0
    active_jobs = 0
    total_applications = 0

    if company:
        total_jobs = JobPosting.query.filter_by(company_id=company.id).count()
        active_jobs = JobPosting.query.filter_by(company_id=company.id, status='Active').count()
        from models.models import Application
        total_applications = Application.query.join(JobPosting).filter(
            JobPosting.company_id == company.id
        ).count()

    return render_template('company/dashboard.html',
                           company=company,
                           total_jobs=total_jobs,
                           active_jobs=active_jobs,
                           total_applications=total_applications)


@company_bp.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    company = Company.query.filter_by(recruiter_id=current_user.id).first()

    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        industry = request.form.get('industry', '').strip()
        website = request.form.get('website', '').strip()
        company_size = request.form.get('company_size', '').strip()
        location = request.form.get('location', '').strip()
        description = request.form.get('description', '').strip()

        if not name or not industry:
            flash('Company name and industry are required.', 'danger')
            return render_template('company/profile.html', company=company)

        logo_filename = company.logo_filename if company else None

        # Handle logo upload
        if 'logo' in request.files:
            file = request.files['logo']
            if file and file.filename and allowed_file(file.filename):
                ext = file.filename.rsplit('.', 1)[1].lower()
                unique_name = f"{uuid.uuid4().hex}.{ext}"
                upload_path = os.path.join(current_app.root_path,
                                           current_app.config['UPLOAD_FOLDER'])
                os.makedirs(upload_path, exist_ok=True)
                file.save(os.path.join(upload_path, unique_name))
                logo_filename = unique_name

        if company:
            company.name = name
            company.industry = industry
            company.website = website
            company.company_size = company_size
            company.location = location
            company.description = description
            company.logo_filename = logo_filename
        else:
            company = Company(
                recruiter_id=current_user.id,
                name=name,
                industry=industry,
                website=website,
                company_size=company_size,
                location=location,
                description=description,
                logo_filename=logo_filename
            )
            db.session.add(company)

        db.session.commit()
        flash('Company profile saved successfully!', 'success')
        return redirect(url_for('company.profile'))

    COMPANY_SIZES = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
    INDUSTRIES = ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail',
                  'Manufacturing', 'Media', 'Consulting', 'Government', 'Other']
    return render_template('company/profile.html', company=company,
                           COMPANY_SIZES=COMPANY_SIZES, INDUSTRIES=INDUSTRIES)
