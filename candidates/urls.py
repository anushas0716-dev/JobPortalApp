from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CandidateProfileViewSet,
    EducationViewSet,
    WorkExperienceViewSet,
    ResumeSkillViewSet,
    ResumeViewSet,
)

router = DefaultRouter()
router.register(r'candidates', CandidateProfileViewSet, basename='candidate')
router.register(r'educations', EducationViewSet, basename='education')
router.register(r'work-experiences', WorkExperienceViewSet, basename='work-experience')
router.register(r'skills', ResumeSkillViewSet, basename='skill')
router.register(r'resumes', ResumeViewSet, basename='resume')

urlpatterns = [
    path('api/', include(router.urls)),
]