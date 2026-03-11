from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CandidateProfileViewSet, EducationViewSet,
    WorkExperienceViewSet, ResumeSkillViewSet, CandidateResumeViewSet
)

router = DefaultRouter()
router.register(r'candidates',         CandidateProfileViewSet,  basename='candidates')
router.register(r'educations',         EducationViewSet,          basename='educations')
router.register(r'work-experiences',   WorkExperienceViewSet,     basename='work-experiences')
router.register(r'skills',             ResumeSkillViewSet,        basename='skills')
router.register(r'candidate-resumes',  CandidateResumeViewSet,    basename='candidate-resumes')

urlpatterns = [
    path('', include(router.urls)),
]