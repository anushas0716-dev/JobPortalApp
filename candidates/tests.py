from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from datetime import date
from .models import CandidateProfile, Education, WorkExperience, ResumeSkill, Resume

User = get_user_model()


# ─────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────

def create_user(email='test@example.com', password='pass1234'):
    username = email.split('@')[0]
    return User.objects.create_user(username=username, email=email, password=password)

def create_candidate(user=None, **kwargs):
    if not user:
        user = create_user()
    defaults = {
        'full_name': 'John Doe',
        'phone': '9876543210',
        'headline': 'Python Developer',
        'experience_years': 3,
        'location': 'Bengaluru',
        'parent_name': 'Mr. Doe',
    }
    defaults.update(kwargs)
    return CandidateProfile.objects.create(user=user, **defaults)


# ─────────────────────────────────────────────
# Model Tests
# ─────────────────────────────────────────────

class CandidateProfileModelTest(TestCase):

    def test_create_candidate(self):
        candidate = create_candidate()
        self.assertEqual(str(candidate), 'John Doe')
        self.assertEqual(candidate.experience_years, 3)

    def test_one_to_one_user(self):
        user = create_user()
        candidate = create_candidate(user=user)
        self.assertEqual(candidate.user, user)


class EducationModelTest(TestCase):

    def setUp(self):
        self.candidate = create_candidate()

    def test_create_education(self):
        edu = Education.objects.create(
            candidate=self.candidate,
            degree='bachelor',
            field_of_study='Computer Science',
            institution='XYZ University',
            start_year=2018,
            end_year=2022,
        )
        self.assertEqual(str(edu), 'John Doe - bachelor in Computer Science')

    def test_current_education_no_end_year(self):
        edu = Education.objects.create(
            candidate=self.candidate,
            degree='master',
            field_of_study='Data Science',
            institution='ABC University',
            start_year=2023,
            is_current=True,
        )
        self.assertIsNone(edu.end_year)
        self.assertTrue(edu.is_current)


class WorkExperienceModelTest(TestCase):

    def setUp(self):
        self.candidate = create_candidate()

    def test_create_work_experience(self):
        work = WorkExperience.objects.create(
            candidate=self.candidate,
            job_title='Backend Developer',
            company_name='Tech Corp',
            start_date=date(2021, 1, 1),
            end_date=date(2023, 6, 30),
        )
        self.assertIn('Backend Developer', str(work))

    def test_current_job(self):
        work = WorkExperience.objects.create(
            candidate=self.candidate,
            job_title='Senior Developer',
            company_name='StartupXYZ',
            start_date=date(2023, 1, 1),
            is_current=True,
        )
        self.assertTrue(work.is_current)
        self.assertIsNone(work.end_date)


class ResumeSkillModelTest(TestCase):

    def setUp(self):
        self.candidate = create_candidate()

    def test_create_skill(self):
        skill = ResumeSkill.objects.create(
            candidate=self.candidate,
            skill_name='Django',
            proficiency='advanced',
            years_of_experience=3,
        )
        self.assertEqual(str(skill), 'John Doe - Django (advanced)')

    def test_unique_skill_per_candidate(self):
        from django.db import IntegrityError
        ResumeSkill.objects.create(candidate=self.candidate, skill_name='Python')
        with self.assertRaises(IntegrityError):
            ResumeSkill.objects.create(candidate=self.candidate, skill_name='Python')


# ─────────────────────────────────────────────
# API Tests
# ─────────────────────────────────────────────

class CandidateProfileAPITest(APITestCase):

    def setUp(self):
        self.user = create_user()
        self.client.force_authenticate(user=self.user)
        self.candidate = create_candidate(user=self.user)

    def test_list_candidates(self):
        response = self.client.get('/api/candidates/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_candidate(self):
        response = self.client.get(f'/api/candidates/{self.candidate.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['full_name'], 'John Doe')

    def test_full_profile_action(self):
        response = self.client.get(f'/api/candidates/{self.candidate.id}/full-profile/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('educations', response.data)
        self.assertIn('work_experiences', response.data)
        self.assertIn('skills', response.data)
        self.assertIn('resumes', response.data)

    def test_update_candidate(self):
        response = self.client.patch(
            f'/api/candidates/{self.candidate.id}/',
            {'headline': 'Senior Python Developer'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['headline'], 'Senior Python Developer')

    def test_search_candidates(self):
        response = self.client.get('/api/candidates/?search=John')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class EducationAPITest(APITestCase):

    def setUp(self):
        self.user = create_user(email='education@example.com')
        self.client.force_authenticate(user=self.user)
        self.candidate = create_candidate(user=self.user)

    def test_create_education(self):
        data = {
            'candidate': self.candidate.id,
            'degree': 'bachelor',
            'field_of_study': 'Computer Science',
            'institution': 'XYZ University',
            'start_year': 2018,
            'end_year': 2022,
        }
        response = self.client.post('/api/educations/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_educations(self):
        response = self.client.get('/api/educations/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class WorkExperienceAPITest(APITestCase):

    def setUp(self):
        self.user = create_user(email='work@example.com')
        self.client.force_authenticate(user=self.user)
        self.candidate = create_candidate(user=self.user)

    def test_create_work_experience(self):
        data = {
            'candidate': self.candidate.id,
            'job_title': 'Backend Developer',
            'company_name': 'Tech Corp',
            'employment_type': 'full_time',
            'start_date': '2021-01-01',
            'end_date': '2023-06-30',
        }
        response = self.client.post('/api/work-experiences/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_invalid_date_range(self):
        data = {
            'candidate': self.candidate.id,
            'job_title': 'Developer',
            'company_name': 'XYZ',
            'start_date': '2023-01-01',
            'end_date': '2021-01-01',  # end before start
        }
        response = self.client.post('/api/work-experiences/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ResumeSkillAPITest(APITestCase):

    def setUp(self):
        self.user = create_user(email='skill@example.com')
        self.client.force_authenticate(user=self.user)
        self.candidate = create_candidate(user=self.user)

    def test_create_skill(self):
        data = {
            'candidate': self.candidate.id,
            'skill_name': 'Django',
            'proficiency': 'advanced',
            'years_of_experience': 3,
        }
        response = self.client.post('/api/skills/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_filter_by_proficiency(self):
        response = self.client.get('/api/skills/?proficiency=advanced')
        self.assertEqual(response.status_code, status.HTTP_200_OK)