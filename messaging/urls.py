from django.urls import path
from . import views

app_name = 'messaging'

urlpatterns = [
    # Conversation endpoints
    path('conversations/', views.list_conversations, name='list_conversations'),
    path('conversations/create/', views.create_conversation, name='create_conversation'),
    path('conversations/<int:conversation_id>/', views.get_conversation, name='get_conversation'),
    
    # Message endpoints
    path('conversations/<int:conversation_id>/messages/', views.list_messages, name='list_messages'),
    path('conversations/<int:conversation_id>/send/', views.send_message, name='send_message'),
    path('conversations/<int:conversation_id>/mark-read/', views.mark_messages_read, name='mark_messages_read'),
    
    # Participant info
    path('conversations/<int:conversation_id>/participants/', views.get_participants, name='get_participants'),
]
