#!/usr/bin/env python3
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jobportal.settings')
django.setup()

from users.models import User
from candidates.models import CandidateProfile
from employers.models import EmployerProfile
from companies.models import Company

print("Setting up test data...")

# Clean up existing data
User.objects.filter(username__in=['candidate1', 'employer1']).delete()
Company.objects.filter(name='Tech Corp').delete()

# Create company
company = Company.objects.create(
    name='Tech Corp',
    website='https://techcorp.com',
    industry='Technology',
    size='100-500',
    description='A leading technology company'
)
print(f"Created company: {company.name}")

# Create candidate user
candidate_user = User.objects.create_user(
    username='candidate1',
    email='candidate@test.com',
    password='testpass123',
    role='candidate'
)
print(f"Created candidate user: {candidate_user.username}")

# Create employer user
employer_user = User.objects.create_user(
    username='employer1',
    email='employer@test.com',
    password='testpass123',
    role='employer'
)
print(f"Created employer user: {employer_user.username}")

# Create profiles
candidate_profile = CandidateProfile.objects.create(
    user=candidate_user,
    full_name='John Doe',
    phone='+1234567890',
    headline='Software Developer',
    experience_years=5,
    location='New York',
    parent_name='Richard Doe'
)
print(f"Created candidate profile: {candidate_profile.full_name}")

employer_profile = EmployerProfile.objects.create(
    user=employer_user,
    company=company,
    designation='Senior Recruiter'
)
print(f"Created employer profile: {employer_profile.designation}")

print("\nTest data setup complete!")
print(f"Candidate ID: {candidate_profile.id}")
print(f"Employer ID: {employer_profile.id}")
print("\nYou can now login with:")
print("Candidate: candidate1 / testpass123")
print("Employer: employer1 / testpass123")
