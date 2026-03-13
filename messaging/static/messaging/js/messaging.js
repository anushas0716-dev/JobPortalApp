// Messaging Module JavaScript

// API Base URL
const API_BASE = '/messaging';

// Current conversation ID
let currentConversationId = null;
let messageRefreshInterval = null;

// Utility Functions
function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return cookieValue || '';
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container-fluid');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// API Functions
async function apiCall(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        }
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, finalOptions);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Message Functions
async function sendMessage(event) {
    event.preventDefault();
    
    const conversationId = document.getElementById('conversationId').value;
    const messageInput = document.getElementById('messageInput');
    const content = messageInput.value.trim();
    
    if (!content) {
        showAlert('Message cannot be empty', 'warning');
        return;
    }
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="loading-spinner"></span>';
    submitButton.disabled = true;
    
    try {
        const response = await apiCall(`/conversations/${conversationId}/send/`, {
            method: 'POST',
            body: JSON.stringify({ content })
        });
        
        if (response.success) {
            messageInput.value = '';
            await addMessageToChat(response.data, true);
            scrollToBottom();
            
            // Mark as read immediately for sent messages
            setTimeout(() => {
                refreshMessages(conversationId);
            }, 1000);
        }
    } catch (error) {
        showAlert(error.message, 'danger');
    } finally {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        messageInput.focus();
    }
}

async function refreshMessages(conversationId) {
    try {
        const response = await apiCall(`/conversations/${conversationId}/messages/?page_size=100`);
        
        if (response.success) {
            await updateMessageList(response);
        }
    } catch (error) {
        console.error('Error refreshing messages:', error);
        // Don't show alert for refresh errors to avoid spam
    }
}

async function markMessagesRead(conversationId) {
    try {
        await apiCall(`/conversations/${conversationId}/mark-read/`, {
            method: 'POST'
        });
    } catch (error) {
        console.error('Error marking messages as read:', error);
    }
}

async function loadParticipantInfo(conversationId) {
    try {
        const response = await apiCall(`/conversations/${conversationId}/participants/`);
        
        if (response.success) {
            displayParticipantInfo(response.data);
        }
    } catch (error) {
        console.error('Error loading participant info:', error);
    }
}

async function createNewConversation(employerId, initialMessage) {
    const candidateId = document.querySelector('[data-candidate-id]')?.dataset.candidateId;
    
    if (!candidateId) {
        showAlert('Unable to determine candidate profile', 'danger');
        return;
    }
    
    const submitButton = document.querySelector('#newConversationForm button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="loading-spinner"></span>';
    submitButton.disabled = true;
    
    try {
        const response = await apiCall('/conversations/create/', {
            method: 'POST',
            body: JSON.stringify({
                candidate_id: candidateId,
                employer_id: employerId
            })
        });
        
        if (response.success) {
            // Send initial message
            const messageResponse = await apiCall(`/conversations/${response.data.id}/send/`, {
                method: 'POST',
                body: JSON.stringify({ content: initialMessage })
            });
            
            if (messageResponse.success) {
                showAlert('Conversation started successfully!', 'success');
                setTimeout(() => {
                    window.location.href = `/messaging/conversation/${response.data.id}/`;
                }, 1500);
            }
        }
    } catch (error) {
        showAlert(error.message, 'danger');
    } finally {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

// UI Functions
function addMessageToChat(message, isSent = false) {
    const messageContainer = document.getElementById('messageContainer');
    if (!messageContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSent ? 'message-sent' : 'message-received'} p-3 mb-2 message-new`;
    
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';
    
    const messageContent = document.createElement('p');
    messageContent.className = 'mb-1';
    messageContent.textContent = message.content;
    
    const messageMeta = document.createElement('small');
    messageMeta.className = 'text-muted';
    messageMeta.innerHTML = `
        ${new Date(message.created_at).toLocaleString()}
        ${isSent ? '<i class="fas fa-check text-muted ms-1"></i>' : ''}
    `;
    
    messageBubble.appendChild(messageContent);
    messageBubble.appendChild(messageMeta);
    messageDiv.appendChild(messageBubble);
    
    messageContainer.appendChild(messageDiv);
}

async function updateMessageList(response) {
    const messageContainer = document.getElementById('messageContainer');
    if (!messageContainer) return;
    
    try {
        let messages = response.data?.messages || response.data || [];
        
        // Handle paginated response
        if (response.data?.messages) {
            messages = response.data.messages;
        }
        
        // Clear existing messages
        messageContainer.innerHTML = '';
        
        // Add all messages
        messages.forEach(message => {
            const isSent = message.sender_role === document.body.dataset.userRole;
            addMessageToChat(message, isSent);
        });
        
        scrollToBottom();
    } catch (error) {
        console.error('Error updating message list:', error);
        showAlert('Error loading messages', 'danger');
    }
}

function scrollToBottom() {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
}

function displayParticipantInfo(participants) {
    const infoContainer = document.getElementById('participantInfo');
    if (!infoContainer) return;
    
    const currentUser = document.body.dataset.userRole;
    const otherUser = currentUser === 'candidate' ? participants.employer : participants.candidate;
    
    let html = '';
    
    if (currentUser === 'candidate') {
        html = `
            <div class="participant-info-item">
                <strong>Company:</strong> ${participants.employer.name}
            </div>
            <div class="participant-info-item">
                <strong>Contact Person:</strong> ${participants.employer.designation}
            </div>
            ${participants.employer.company_website ? `
                <div class="participant-info-item">
                    <strong>Website:</strong> 
                    <a href="${participants.employer.company_website}" target="_blank">
                        ${participants.employer.company_website}
                    </a>
                </div>
            ` : ''}
        `;
    } else {
        html = `
            <div class="participant-info-item">
                <strong>Candidate:</strong> ${participants.candidate.name}
            </div>
            ${participants.candidate.email ? `
                <div class="participant-info-item">
                    <strong>Email:</strong> ${participants.candidate.email}
                </div>
            ` : ''}
            ${participants.candidate.phone ? `
                <div class="participant-info-item">
                    <strong>Phone:</strong> ${participants.candidate.phone}
                </div>
            ` : ''}
        `;
    }
    
    infoContainer.innerHTML = html;
}

function toggleParticipantInfo() {
    const modal = new bootstrap.Modal(document.getElementById('participantInfoModal'));
    modal.show();
}

// Auto-refresh management
function startAutoRefresh(conversationId) {
    currentConversationId = conversationId;
    
    // Clear any existing interval
    if (messageRefreshInterval) {
        clearInterval(messageRefreshInterval);
    }
    
    // Start new interval
    messageRefreshInterval = setInterval(() => {
        refreshMessages(conversationId);
    }, 5000);
}

function stopAutoRefresh() {
    if (messageRefreshInterval) {
        clearInterval(messageRefreshInterval);
        messageRefreshInterval = null;
    }
    currentConversationId = null;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add user role to body for JavaScript access
    document.body.dataset.userRole = document.body.dataset.userRole || 'unknown';
    
    // Handle message input
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                document.getElementById('messageForm').dispatchEvent(new Event('submit'));
            }
        });
    }
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoRefresh();
        } else if (currentConversationId) {
            startAutoRefresh(currentConversationId);
        }
    });
    
    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        stopAutoRefresh();
    });
});

// Global functions for template access
window.sendMessage = sendMessage;
window.refreshMessages = refreshMessages;
window.loadParticipantInfo = loadParticipantInfo;
window.createNewConversation = createNewConversation;
window.toggleParticipantInfo = toggleParticipantInfo;
