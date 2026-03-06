# app.py
from flask import Flask, redirect, url_for
from applications.routes import applications_bp

app = Flask(__name__)
app.secret_key = 'jobportal-secret-key-change-in-production'

# ── Register Blueprints ───────────────────────────────────────────────────────
app.register_blueprint(applications_bp)

# ── Root redirect ─────────────────────────────────────────────────────────────
@app.route('/')
def index():
    return redirect(url_for('applications.browse_jobs'))


if __name__ == '__main__':
    app.run(debug=True)
