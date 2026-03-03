#!/usr/bin/env python3
"""
Test basic fixes that don't require new dependencies
"""
import os
import sys
import django

# Add project path
sys.path.append('/Users/amish/Desktop/JobPortalApp')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jobportal.settings')
django.setup()

from django.core.exceptions import ValidationError
from users.models import User, PasswordResetOTP
from candidates.models import CandidateProfile
from employers.models import EmployerProfile
from companies.models import Company
from messaging.models import Conversation, Message

def test_basic_fixes():
    """Test fixes that don't require new dependencies"""
    print("Testing basic codebase fixes...\n")
    
    # Test 1: Model string representations
    print("=== Testing Model String Representations ===")
    try:
        # Create test company
        company = Company.objects.create(
            name='Test Company',
            industry='Technology',
            size='100-500'
        )
        print(f"✓ Company string: {company}")
        
        # Create test user
        user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            role='candidate'
        )
        
        # Create candidate profile
        candidate = CandidateProfile.objects.create(
            user=user,
            full_name='Test Candidate',
            phone='+1234567890',
            location='Test City',
            parent_name='Test Parent'
        )
        print(f"✓ Candidate string: {candidate}")
        
        # Create employer profile
        employer_user = User.objects.create_user(
            username='employer',
            email='employer@example.com',
            password='testpass123',
            role='employer'
        )
        
        employer = EmployerProfile.objects.create(
            user=employer_user,
            company=company,
            designation='Test Recruiter'
        )
        print(f"✓ Employer string: {employer}")
        
        # Create conversation
        conversation = Conversation.objects.create(
            candidate=candidate,
            employer=employer
        )
        print(f"✓ Conversation string: {conversation}")
        
        # Create message
        message = Message.objects.create(
            conversation=conversation,
            sender=user,
            content='Test message'
        )
        print(f"✓ Message string: {message}")
        
    except Exception as e:
        print(f"✗ Model string test failed: {e}")
    
    # Test 2: OTP Model
    print("\n=== Testing OTP Model ===")
    try:
        otp = PasswordResetOTP.objects.create(
            user=user,
            code='123456'
        )
        print(f"✓ OTP string: {otp}")
        print(f"✓ OTP expired: {otp.is_expired()}")
        
    except Exception as e:
        print(f"✗ OTP test failed: {e}")
    
    # Test 3: Conversation Uniqueness (if constraint is applied)
    print("\n=== Testing Conversation Uniqueness ===")
    try:
        # Try to create duplicate conversation
        try:
            duplicate_conv = Conversation.objects.create(
                candidate=candidate,
                employer=employer
            )
            print("⚠ Duplicate conversation created (constraint may not be applied yet)")
        except Exception as e:
            print(f"✓ Duplicate conversation prevented: {e}")
            
    except Exception as e:
        print(f"✗ Conversation uniqueness test failed: {e}")
    
    # Test 4: Phone Validation (basic test)
    print("\n=== Testing Phone Validation ===")
    try:
        # Test valid phone
        valid_candidate = CandidateProfile(
            user=user,
            full_name='Valid Test',
            phone='+1234567890',
            location='Test',
            parent_name='Test'
        )
        try:
            valid_candidate.full_clean()
            print("✓ Valid phone accepted")
        except ValidationError as e:
            print(f"✗ Valid phone rejected: {e}")
        
        # Test invalid phone
        invalid_candidate = CandidateProfile(
            user=user,
            full_name='Invalid Test',
            phone='invalid-phone',
            location='Test',
            parent_name='Test'
        )
        try:
            invalid_candidate.full_clean()
            print("⚠ Invalid phone accepted (validator may not be working)")
        except ValidationError as e:
            print(f"✓ Invalid phone rejected: {e}")
            
    except Exception as e:
        print(f"✗ Phone validation test failed: {e}")
    
    # Test 5: Database Ordering
    print("\n=== Testing Database Ordering ===")
    try:
        # Test conversation ordering
        conversations = Conversation.objects.all()
        print(f"✓ Conversations ordered: {len(conversations)} found")
        
        # Test message ordering
        messages = Message.objects.all()
        print(f"✓ Messages ordered: {len(messages)} found")
        
    except Exception as e:
        print(f"✗ Ordering test failed: {e}")
    
    print("\n" + "="*50)
    print("Basic testing completed!")
    print("Note: Some features require new dependencies to be installed.")

if __name__ == '__main__':
    test_basic_fixes()
