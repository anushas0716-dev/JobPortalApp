from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, SuggestedJobsView

router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='jobs')

urlpatterns = [
    path('', include(router.urls)),
    path('suggested-jobs/', SuggestedJobsView.as_view(), name='suggested-jobs'),  # ← NEW
]