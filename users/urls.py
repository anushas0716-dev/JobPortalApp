from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('password-reset/request/', views.password_reset_request_view, name='password_reset_request'),
    path('password-reset/confirm/', views.password_reset_confirm_view, name='password_reset_confirm'),
    path('profile/', views.profile_view, name='profile'),
]

