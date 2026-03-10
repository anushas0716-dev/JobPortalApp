from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from backend.config import Config
from models import db
from routes.auth_routes import auth_bp
from routes.employer_routes import employer_bp
from routes.candidate_routes import candidate_bp
from routes.job_routes import job_bp
from routes.resume_routes import resume_bp
from routes.hr_filter_routes import hr_filter_bp

login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # ── CORS fix ──────────────────────────────────────────────────────────────
    CORS(app, supports_credentials=True, origins=[
        "http://localhost:3000",
        "http://localhost:4200",
        "http://localhost:5173",
        "http://127.0.0.1:5000",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
    ])

    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    # Register Blueprints
    app.register_blueprint(auth_bp,      url_prefix='/api/auth')
    app.register_blueprint(employer_bp,  url_prefix='/api/employer')
    app.register_blueprint(candidate_bp, url_prefix='/api/candidate')
    app.register_blueprint(job_bp,       url_prefix='/api/jobs')
    app.register_blueprint(resume_bp,    url_prefix='/api/resumes')
    app.register_blueprint(hr_filter_bp, url_prefix='/api/hr')

    # Homepage
    @app.route('/')
    def homepage():
        return render_template('index.html')

    with app.app_context():
        db.create_all()

    return app


@login_manager.user_loader
def load_user(user_id):
    from models.user_model import User
    return User.query.get(int(user_id))


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
