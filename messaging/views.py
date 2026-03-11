import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.db.models import Q, Count
from django_ratelimit.decorators import ratelimit

from .models import Conversation, Message
from candidates.models import CandidateProfile
from employers.models import EmployerProfile
from users.models import User


def _json_error(message, status=400):
    return JsonResponse({'success': False, 'error': message}, status=status)


def _json_success(data=None, message=None, status=200):
    response = {'success': True}
    if data is not None:
        response['data'] = data
    if message:
        response['message'] = message
    return JsonResponse(response, status=status)


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


def _serialize_conversation(conversation, user):
    """Serialize conversation with user-specific data"""
    # Get unread count for this user
    unread_count = Message.objects.filter(
        conversation=conversation,
        is_read=False
    ).exclude(sender=user).count()
    
    # Get last message
    last_message = conversation.messages.order_by('-created_at').first()
    last_message_data = None
    if last_message:
        last_message_data = {
            'id': last_message.id,
            'content': last_message.content,
            'sender_name': _get_sender_name(last_message.sender),
            'sender_role': last_message.sender.role,
            'created_at': last_message.created_at.isoformat(),
            'is_read': last_message.is_read
        }
    
    return {
        'id': conversation.id,
        'candidate_name': conversation.candidate.full_name,
        'employer_info': {
            'name': conversation.employer.company.name,
            'designation': conversation.employer.designation
        },
        'created_at': conversation.created_at.isoformat(),
        'last_message': last_message_data,
        'unread_count': unread_count
    }


def _serialize_message(message):
    """Serialize message with sender info"""
    return {
        'id': message.id,
        'content': message.content,
        'is_read': message.is_read,
        'created_at': message.created_at.isoformat(),
        'sender_name': _get_sender_name(message.sender),
        'sender_role': message.sender.role
    }


def _get_sender_name(sender):
    """Get display name for sender"""
    if sender.role == 'candidate':
        try:
            return sender.candidate_profile.full_name
        except CandidateProfile.DoesNotExist:
            return sender.email
    elif sender.role == 'employer':
        try:
            employer = sender.employer_profile
            return f"{employer.designation} at {employer.company.name}"
        except EmployerProfile.DoesNotExist:
            return sender.email
    return sender.email


@csrf_exempt
@require_http_methods(["POST"])
@login_required
@ratelimit(key='user', rate='10/h', method='POST')
def create_conversation(request):
    """
    Create a new conversation between candidate and employer
    Only candidates can initiate conversations
    """
    try:
        data = json.loads(request.body or "{}")
    except Exception:
        return _json_error("Invalid JSON payload.")
    
    if request.user.role != 'candidate':
        return _json_error("Only candidates can initiate conversations.", status=403)
    
    candidate_id = data.get('candidate_id')
    employer_id = data.get('employer_id')
    
    if not candidate_id or not employer_id:
        return _json_error("Both candidate_id and employer_id are required.")
    
    try:
        candidate = CandidateProfile.objects.get(id=candidate_id)
        employer = EmployerProfile.objects.get(id=employer_id)
        
        if request.user != candidate.user:
            return _json_error("You can only create conversations for yourself.", status=403)
        
        conversation, created = Conversation.objects.get_or_create(
            candidate=candidate,
            employer=employer
        )
        
        return _json_success(
            data=_serialize_conversation(conversation, request.user),
            message="Conversation created successfully." if created else "Conversation already exists.",
            status=201 if created else 200
        )
        
    except (CandidateProfile.DoesNotExist, EmployerProfile.DoesNotExist):
        return _json_error("Invalid candidate or employer ID.", status=404)


@login_required
def list_conversations(request):
    """
    List all conversations for the authenticated user
    """
    profile, user_type = _get_user_profile(request.user)
    if not profile:
        return _json_error("Profile not found.", status=404)
    
    conversations = Conversation.objects.filter(
        Q(candidate=profile) if user_type == 'candidate' else Q(employer=profile)
    ).order_by('-created_at')
    
    conversations_data = [_serialize_conversation(conv, request.user) for conv in conversations]
    
    return _json_success(data=conversations_data)


@login_required
def get_conversation(request, conversation_id):
    """
    Get details of a specific conversation
    """
    conversation = get_object_or_404(Conversation, id=conversation_id)
    
    if not _can_access_conversation(request.user, conversation):
        return _json_error("Access denied.", status=403)
    
    return _json_success(data=_serialize_conversation(conversation, request.user))


@csrf_exempt
@require_http_methods(["POST"])
@login_required
@ratelimit(key='user', rate='30/m', method='POST')
def send_message(request, conversation_id):
    """
    Send a message in a conversation
    """
    try:
        data = json.loads(request.body or "{}")
    except Exception:
        return _json_error("Invalid JSON payload.")
    
    conversation = get_object_or_404(Conversation, id=conversation_id)
    
    if not _can_access_conversation(request.user, conversation):
        return _json_error("Access denied.", status=403)
    
    content = data.get('content', '').strip()
    if not content:
        return _json_error("Message content cannot be empty.")
    
    if len(content) > 5000:
        return _json_error("Message content is too long. Maximum 5000 characters allowed.")
    
    message = Message.objects.create(
        conversation=conversation,
        sender=request.user,
        content=content
    )
    
    return _json_success(
        data=_serialize_message(message),
        message="Message sent successfully.",
        status=201
    )


@login_required
def list_messages(request, conversation_id):
    """
    List all messages in a conversation
    """
    conversation = get_object_or_404(Conversation, id=conversation_id)
    
    if not _can_access_conversation(request.user, conversation):
        return _json_error("Access denied.", status=403)
    
    messages = conversation.messages.order_by('created_at')
    messages_data = [_serialize_message(msg) for msg in messages]
    
    return _json_success(data=messages_data)


@csrf_exempt
@require_http_methods(["POST"])
@login_required
def mark_messages_read(request, conversation_id):
    """
    Mark all unread messages in a conversation as read
    """
    conversation = get_object_or_404(Conversation, id=conversation_id)
    
    if not _can_access_conversation(request.user, conversation):
        return _json_error("Access denied.", status=403)
    
    updated_count = Message.objects.filter(
        conversation=conversation,
        is_read=False
    ).exclude(sender=request.user).update(is_read=True)
    
    return _json_success(
        data={'updated_count': updated_count},
        message=f"Marked {updated_count} messages as read."
    )


@login_required
def get_participants(request, conversation_id):
    """
    Get participant information with privacy controls
    Personal contact details are only visible to the owner
    """
    conversation = get_object_or_404(Conversation, id=conversation_id)
    
    if not _can_access_conversation(request.user, conversation):
        return _json_error("Access denied.", status=403)
    
    # Candidate data - only show contact info to the candidate themselves
    candidate_data = {
        'id': conversation.candidate.id,
        'name': conversation.candidate.full_name,
        'role': 'candidate',
        'phone': conversation.candidate.phone if request.user == conversation.candidate.user else None,
        'email': conversation.candidate.user.email if request.user == conversation.candidate.user else None
    }
    
    # Employer data - only show company website to the employer themselves
    employer_data = {
        'id': conversation.employer.id,
        'name': conversation.employer.company.name,
        'role': 'employer',
        'designation': conversation.employer.designation,
        'company_website': conversation.employer.company.website if request.user == conversation.employer.user else None
    }
    
    return _json_success(data={
        'candidate': candidate_data,
        'employer': employer_data
    })
