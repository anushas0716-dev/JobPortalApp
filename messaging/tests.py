import json
from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from candidates.models import CandidateProfile
from employers.models import EmployerProfile
from companies.models import Company
from messaging.models import Conversation, Message

User = get_user_model()


class MessagingAPITestCase(TestCase):
    def setUp(self):
        self.client = Client()
        
        # Create users
        self.candidate_user = User.objects.create_user(
            username='candidate1',
            email='candidate@test.com',
            password='testpass123',
            role='candidate'
        )
        
        self.employer_user = User.objects.create_user(
            username='employer1',
            email='employer@test.com',
            password='testpass123',
            role='employer'
        )
        
        self.other_candidate_user = User.objects.create_user(
            username='candidate2',
            email='candidate2@test.com',
            password='testpass123',
            role='candidate'
        )
        
        # Create company for employer
        self.company = Company.objects.create(
            name='Tech Corp',
            website='https://techcorp.com',
            industry='Technology',
            size='100-500',
            description='A leading technology company'
        )
        
        # Create profiles
        self.candidate_profile = CandidateProfile.objects.create(
            user=self.candidate_user,
            full_name='John Doe',
            phone='+1234567890',
            headline='Software Developer',
            experience_years=5,
            location='New York',
            parent_name='Richard Doe'
        )
        
        self.employer_profile = EmployerProfile.objects.create(
            user=self.employer_user,
            company=self.company,
            designation='Senior Recruiter'
        )
        
        self.other_candidate_profile = CandidateProfile.objects.create(
            user=self.other_candidate_user,
            full_name='Jane Smith',
            phone='+0987654321',
            headline='Data Analyst',
            experience_years=3,
            location='San Francisco',
            parent_name='Robert Smith'
        )
        
        # Create a test conversation
        self.conversation = Conversation.objects.create(
            candidate=self.candidate_profile,
            employer=self.employer_profile
        )
        
        # Create test messages
        self.message1 = Message.objects.create(
            conversation=self.conversation,
            sender=self.candidate_user,
            content='Hello, I am interested in the position.'
        )
        
        self.message2 = Message.objects.create(
            conversation=self.conversation,
            sender=self.employer_user,
            content='Great! Let me review your application.'
        )


class ConversationTests(MessagingAPITestCase):
    def test_candidate_can_create_conversation(self):
        """Test that candidates can create conversations"""
        self.client.login(username='candidate1', password='testpass123')
        
        data = {
            'candidate_id': self.candidate_profile.id,
            'employer_id': self.employer_profile.id
        }
        
        response = self.client.post(
            '/api/messaging/conversations/create/',
            data=json.dumps(data),
            content_type='application/json'
        )
        
        # Since conversation already exists from setUp, it should return 200
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertIn('data', response_data)
        self.assertEqual(response_data['data']['candidate_name'], 'John Doe')
        
    def test_employer_cannot_create_conversation(self):
        """Test that employers cannot initiate conversations"""
        self.client.login(username='employer1', password='testpass123')
        
        data = {
            'candidate_id': self.candidate_profile.id,
            'employer_id': self.employer_profile.id
        }
        
        response = self.client.post(
            '/api/messaging/conversations/create/',
            data=json.dumps(data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 403)
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        self.assertIn('Only candidates can initiate conversations', response_data['error'])
        
    def test_candidate_can_list_own_conversations(self):
        """Test that candidates can list their conversations"""
        self.client.login(username='candidate1', password='testpass123')
        
        response = self.client.get('/api/messaging/conversations/')
        
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(len(response_data['data']), 1)
        self.assertEqual(response_data['data'][0]['candidate_name'], 'John Doe')
        self.assertEqual(response_data['data'][0]['employer_info']['name'], 'Tech Corp')
        
    def test_employer_can_list_own_conversations(self):
        """Test that employers can list their conversations"""
        self.client.login(username='employer1', password='testpass123')
        
        response = self.client.get('/api/messaging/conversations/')
        
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(len(response_data['data']), 1)
        self.assertEqual(response_data['data'][0]['candidate_name'], 'John Doe')
        self.assertEqual(response_data['data'][0]['employer_info']['name'], 'Tech Corp')
        
    def test_user_cannot_list_others_conversations(self):
        """Test that users cannot see conversations they're not part of"""
        self.client.login(username='candidate2', password='testpass123')
        
        response = self.client.get('/api/messaging/conversations/')
        
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(len(response_data['data']), 0)
        
    def test_unauthenticated_cannot_access_conversations(self):
        """Test that unauthenticated users cannot access conversations"""
        response = self.client.get('/api/messaging/conversations/')
        
        self.assertEqual(response.status_code, 302)  # Redirect to login


class MessageTests(MessagingAPITestCase):
    def test_participant_can_send_message(self):
        """Test that conversation participants can send messages"""
        self.client.login(username='candidate1', password='testpass123')
        
        data = {'content': 'When can we schedule an interview?'}
        response = self.client.post(
            f'/api/messaging/conversations/{self.conversation.id}/send/',
            data=json.dumps(data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 201)
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['data']['content'], 'When can we schedule an interview?')
        self.assertEqual(response_data['data']['sender_name'], 'John Doe')
        self.assertEqual(response_data['data']['sender_role'], 'candidate')
        
    def test_non_participant_cannot_send_message(self):
        """Test that non-participants cannot send messages"""
        self.client.login(username='candidate2', password='testpass123')
        
        data = {'content': 'I should not be able to send this'}
        response = self.client.post(
            f'/api/messaging/conversations/{self.conversation.id}/send/',
            data=json.dumps(data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 403)
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        
    def test_participant_can_list_messages(self):
        """Test that participants can list conversation messages"""
        self.client.login(username='candidate1', password='testpass123')
        
        response = self.client.get(f'/api/messaging/conversations/{self.conversation.id}/messages/')
        
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(len(response_data['data']), 2)
        self.assertEqual(response_data['data'][0]['content'], 'Hello, I am interested in the position.')
        self.assertEqual(response_data['data'][1]['content'], 'Great! Let me review your application.')
        
    def test_messages_are_ordered_chronologically(self):
        """Test that messages are returned in chronological order"""
        # Create a third message
        Message.objects.create(
            conversation=self.conversation,
            sender=self.candidate_user,
            content='Thank you for your response.'
        )
        
        self.client.login(username='candidate1', password='testpass123')
        response = self.client.get(f'/api/messaging/conversations/{self.conversation.id}/messages/')
        
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(len(response_data['data']), 3)
        self.assertEqual(response_data['data'][0]['content'], 'Hello, I am interested in the position.')
        self.assertEqual(response_data['data'][1]['content'], 'Great! Let me review your application.')
        self.assertEqual(response_data['data'][2]['content'], 'Thank you for your response.')
        
    def test_unread_message_count(self):
        """Test that unread message count is calculated correctly"""
        self.client.login(username='candidate1', password='testpass123')
        
        # Mark one message as read
        self.message1.is_read = True
        self.message1.save()
        
        response = self.client.get('/api/messaging/conversations/')
        
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['data'][0]['unread_count'], 1)  # Only message2 is unread for candidate


class PrivacyTests(MessagingAPITestCase):
    def test_contact_info_hidden_from_non_owner(self):
        """Test that contact information is hidden from non-owners"""
        self.client.login(username='employer1', password='testpass123')
        
        response = self.client.get(f'/api/messaging/conversations/{self.conversation.id}/participants/')
        
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        # Candidate's contact info should be hidden from employer
        self.assertIsNone(response_data['data']['candidate']['phone'])
        self.assertIsNone(response_data['data']['candidate']['email'])
        # Employer's own company website should be visible
        self.assertIsNotNone(response_data['data']['employer']['company_website'])
        
    def test_contact_info_visible_to_owner(self):
        """Test that contact information is visible to owner"""
        self.client.login(username='candidate1', password='testpass123')
        
        response = self.client.get(f'/api/messaging/conversations/{self.conversation.id}/participants/')
        
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        # Candidate's own contact info should be visible
        self.assertEqual(response_data['data']['candidate']['phone'], '+1234567890')
        self.assertEqual(response_data['data']['candidate']['email'], 'candidate@test.com')
        # Employer's company website should be hidden from candidate
        self.assertIsNone(response_data['data']['employer']['company_website'])
        
    def test_non_participant_cannot_access_participants(self):
        """Test that non-participants cannot access participant info"""
        self.client.login(username='candidate2', password='testpass123')
        
        response = self.client.get(f'/api/messaging/conversations/{self.conversation.id}/participants/')
        
        self.assertEqual(response.status_code, 403)
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])


class MessageReadTests(MessagingAPITestCase):
    def test_mark_messages_as_read(self):
        """Test marking messages as read"""
        self.client.login(username='candidate1', password='testpass123')
        
        # Initially, employer's message should be unread for candidate
        self.assertFalse(self.message2.is_read)
        
        response = self.client.post(
            f'/api/messaging/conversations/{self.conversation.id}/mark-read/',
            data=json.dumps({}),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertTrue(response_data['success'])
        self.assertEqual(response_data['data']['updated_count'], 1)
        
        # Refresh message from database
        self.message2.refresh_from_db()
        self.assertTrue(self.message2.is_read)
        
    def test_non_participant_cannot_mark_messages_read(self):
        """Test that non-participants cannot mark messages as read"""
        self.client.login(username='candidate2', password='testpass123')
        
        response = self.client.post(
            f'/api/messaging/conversations/{self.conversation.id}/mark-read/',
            data=json.dumps({}),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 403)
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])


class EdgeCaseTests(MessagingAPITestCase):
    def test_conversation_creation_with_invalid_ids(self):
        """Test conversation creation with invalid candidate/employer IDs"""
        self.client.login(username='candidate1', password='testpass123')
        
        data = {
            'candidate_id': 9999,  # Invalid ID
            'employer_id': self.employer_profile.id
        }
        
        response = self.client.post(
            '/api/messaging/conversations/create/',
            data=json.dumps(data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 404)
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        
    def test_conversation_creation_without_required_fields(self):
        """Test conversation creation without required fields"""
        self.client.login(username='candidate1', password='testpass123')
        
        data = {'candidate_id': self.candidate_profile.id}  # Missing employer_id
        
        response = self.client.post(
            '/api/messaging/conversations/create/',
            data=json.dumps(data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 400)
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        
    def test_candidate_cannot_create_conversation_for_others(self):
        """Test that candidates cannot create conversations for other candidates"""
        self.client.login(username='candidate1', password='testpass123')
        
        data = {
            'candidate_id': self.other_candidate_profile.id,  # Different candidate
            'employer_id': self.employer_profile.id
        }
        
        response = self.client.post(
            '/api/messaging/conversations/create/',
            data=json.dumps(data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 403)
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
        
    def test_duplicate_conversation_prevention(self):
        """Test that duplicate conversations are prevented"""
        self.client.login(username='candidate1', password='testpass123')
        
        # Create a new conversation (different from setUp)
        other_company = Company.objects.create(
            name='Another Corp',
            website='https://another.com',
            industry='Finance',
            size='50-100',
            description='Another company'
        )
        
        other_employer = User.objects.create_user(
            username='employer2',
            email='employer2@test.com',
            password='testpass123',
            role='employer'
        )
        
        other_employer_profile = EmployerProfile.objects.create(
            user=other_employer,
            company=other_company,
            designation='HR Manager'
        )
        
        data = {
            'candidate_id': self.candidate_profile.id,
            'employer_id': other_employer_profile.id
        }
        
        # First request should create the conversation
        response1 = self.client.post(
            '/api/messaging/conversations/create/',
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response1.status_code, 201)
        
        # Second request should return existing conversation
        response2 = self.client.post(
            '/api/messaging/conversations/create/',
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response2.status_code, 200)  # 200, not 201, since it already exists
        
    def test_empty_message_content(self):
        """Test sending message with empty content"""
        self.client.login(username='candidate1', password='testpass123')
        
        data = {'content': ''}
        response = self.client.post(
            f'/api/messaging/conversations/{self.conversation.id}/send/',
            data=json.dumps(data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 400)
        response_data = json.loads(response.content)
        self.assertFalse(response_data['success'])
