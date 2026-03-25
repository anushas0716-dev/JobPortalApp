# applications/routes.py
from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, session
from datetime import datetime

applications_bp = Blueprint('applications', __name__, url_prefix='/applications')

# ─── In-memory data store (replace with your SQLAlchemy models) ───────────────
JOBS = [
    {"id": 1, "title": "Senior Python Developer", "company": "TechNova Inc.",
     "logo": "T", "color": "#6366F1", "location": "Remote",
     "salary": "$90k – $120k", "tags": ["Python", "Flask", "AWS"],
     "posted": "Feb 18, 2026"},

    {"id": 2, "title": "Backend Engineer", "company": "FinSync Ltd.",
     "logo": "F", "color": "#0EA5E9", "location": "New York, NY",
     "salary": "$95k – $130k", "tags": ["Node.js", "MongoDB", "Express"],
     "posted": "Feb 20, 2026"},

    {"id": 3, "title": "Data Analyst", "company": "Craftly",
     "logo": "C", "color": "#F59E0B", "location": "Austin, TX",
     "salary": "$70k – $95k", "tags": ["SQL", "Python", "Tableau"],
     "posted": "Feb 22, 2026"},

    {"id": 4, "title": "DevOps Engineer", "company": "CloudBase",
     "logo": "D", "color": "#10B981", "location": "Remote",
     "salary": "$100k – $140k", "tags": ["Docker", "Kubernetes", "CI/CD"],
     "posted": "Feb 24, 2026"},
]

APPLICATIONS = [
    {"id": 101, "job_id": 2, "title": "Backend Engineer",
     "company": "FinSync Ltd.", "logo": "F", "color": "#0EA5E9",
     "date": "Feb 25, 2026", "status": "Under Review", "cover_letter": ""},

    {"id": 102, "job_id": 3, "title": "Data Analyst",
     "company": "Craftly", "logo": "C", "color": "#F59E0B",
     "date": "Jan 15, 2026", "status": "Rejected", "cover_letter": ""},
]

STATUS_LIST = [
    "Applied",
    "Under Review",
    "Shortlisted",
    "Interview Scheduled",
    "Rejected",
    "Offered",
]


# ─── Helpers ──────────────────────────────────────────────────────────────────
def applied_job_ids():
    return [a["job_id"] for a in APPLICATIONS]


def get_job(job_id):
    return next((j for j in JOBS if j["id"] == job_id), None)


def get_app(app_id):
    return next((a for a in APPLICATIONS if a["id"] == app_id), None)


# ─── Routes ───────────────────────────────────────────────────────────────────

# FR-10 ── Browse Jobs
@applications_bp.route('/jobs')
def browse_jobs():
    return render_template(
        'applications/browse_jobs.html',
        jobs=JOBS,
        applied_ids=applied_job_ids()
    )


# FR-10 ── Apply for a Job
@applications_bp.route('/jobs/<int:job_id>/apply', methods=['GET', 'POST'])
def apply(job_id):
    job = get_job(job_id)
    if not job:
        flash("Job not found.", "error")
        return redirect(url_for('applications.browse_jobs'))

    already = job_id in applied_job_ids()

    if request.method == 'POST':
        # ── Duplicate prevention ──
        if already:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return jsonify({"success": False,
                                "duplicate": True,
                                "message": "You have already applied for this job."}), 409
            flash("You have already applied for this job.", "error")
            return redirect(url_for('applications.browse_jobs'))

        cover_letter = request.form.get('cover_letter', '').strip()
        use_profile  = 'use_profile' in request.form

        new_app = {
            "id":           len(APPLICATIONS) + 200,
            "job_id":       job_id,
            "title":        job["title"],
            "company":      job["company"],
            "logo":         job["logo"],
            "color":        job["color"],
            "date":         datetime.now().strftime("%b %d, %Y"),
            "status":       "Applied",
            "cover_letter": cover_letter,
            "use_profile":  use_profile,
        }
        APPLICATIONS.insert(0, new_app)

        # ── AJAX submit ──
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return jsonify({"success": True,
                            "message": "Application submitted successfully!",
                            "app_id":  new_app["id"]})

        flash("Application submitted successfully!", "success")
        return redirect(url_for('applications.my_applications'))

    return render_template(
        'applications/apply.html',
        job=job,
        already=already
    )


# FR-11 ── Track applications
@applications_bp.route('/my-applications')
def my_applications():
    status_filter = request.args.get('status', 'All')

    if status_filter == 'All':
        shown = APPLICATIONS
    else:
        shown = [a for a in APPLICATIONS if a["status"] == status_filter]

    counts = {"All": len(APPLICATIONS)}
    for s in STATUS_LIST:
        counts[s] = sum(1 for a in APPLICATIONS if a["status"] == s)

    return render_template(
        'applications/my_applications.html',
        applications=shown,
        all_apps=APPLICATIONS,
        status_filter=status_filter,
        status_list=STATUS_LIST,
        counts=counts
    )


# ── (Recruiter / admin) update status via PATCH ───────────────────────────────
@applications_bp.route('/api/application/<int:app_id>/status', methods=['PATCH'])
def update_status(app_id):
    app = get_app(app_id)
    if not app:
        return jsonify({"error": "Not found"}), 404
    data = request.get_json(silent=True) or {}
    new_status = data.get("status")
    if new_status not in STATUS_LIST:
        return jsonify({"error": "Invalid status"}), 400
    app["status"] = new_status
    return jsonify({"success": True, "status": new_status})
