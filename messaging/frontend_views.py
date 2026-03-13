from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.db.models import Q
import json
from .models import Conversation, Message
from candidates.models import CandidateProfile
from employers.models import EmployerProfile


@login_required
def inbox_view(request):
    """Main messaging inbox view"""
    profile, user_type = _get_user_profile(request.user)
    if not profile:
        return redirect('profile_setup')
    
    conversations = Conversation.objects.filter(
        Q(candidate=profile) if user_type == 'candidate' else Q(employer=profile)
    ).order_by('-created_at')
    
    # Get selected conversation if provided
    selected_conversation = None
    selected_conversation_id = request.GET.get('conversation')
    if selected_conversation_id:
        try:
            selected_conversation = conversations.get(id=selected_conversation_id)
            # Mark messages as read
            Message.objects.filter(
                conversation=selected_conversation,
                is_read=False
            ).exclude(sender=request.user).update(is_read=True)
        except Conversation.DoesNotExist:
            pass
    
    context = {
        'conversations': conversations,
        'user_type': user_type,
        'profile': profile,
        'selected_conversation': selected_conversation,
        'active_conversation_id': selected_conversation_id
    }
    return render(request, 'messaging/inbox.html', context)


@login_required
def conversation_view(request, conversation_id):
    """Individual conversation view"""
    conversation = get_object_or_404(Conversation, id=conversation_id)
    
    if not _can_access_conversation(request.user, conversation):
        return redirect('inbox')
    
    messages = conversation.messages.order_by('created_at')
    
    # Mark messages as read
    Message.objects.filter(
        conversation=conversation,
        is_read=False
    ).exclude(sender=request.user).update(is_read=True)
    
    context = {
        'conversation': conversation,
        'messages': messages,
        'user_type': request.user.role
    }
    return render(request, 'messaging/conversation.html', context)


@login_required
def new_conversation_view(request):
    """View to start a new conversation"""
    if request.user.role != 'candidate':
        return redirect('inbox')
    
    try:
        candidate = request.user.candidate_profile
    except CandidateProfile.DoesNotExist:
        return redirect('profile_setup')
    
    # Get list of employers for candidate to choose from
    # This could be filtered based on applications, job views, etc.
    employers = EmployerProfile.objects.all()[:20]  # Limit for performance
    
    context = {
        'candidate': candidate,
        'employers': employers
    }
    return render(request, 'messaging/new_conversation.html', context)


# Helper functions (reuse from views.py)
def _get_user_profile(user):
    """Get candidate or employer profile for the user"""
    if user.role == 'candidate':
        try:
            return user.candidate_profile, 'candidate'
        except CandidateProfile.DoesNotExist:
            return None, 'candidate'
    elif user.role == 'employer':
        try:
            return user.employer_profile, 'employer'
        except EmployerProfile.DoesNotExist:
            return None, 'employer'
    return None, None


def _can_access_conversation(user, conversation):
    """Check if user can access the conversation"""
    if user.role == 'candidate':
        try:
            return conversation.candidate.user == user
        except CandidateProfile.DoesNotExist:
            return False
    elif user.role == 'employer':
        try:
            return conversation.employer.user == user
        except EmployerProfile.DoesNotExist:
            return False
    return False
