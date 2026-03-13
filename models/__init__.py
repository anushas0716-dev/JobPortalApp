from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from models.user_model import User
from models.employer_model import Employer
from models.candidate_model import Candidate
from models.job_model import Job
from models.resume_model import Resume
from models.application_model import Application
