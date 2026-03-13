#!/usr/bin/env python3
"""
Create Superuser Management Command
"""
import os
import sys
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Create a superuser with fixed credentials'

    def handle(self, *args, **options):
        User = get_user_model()
        
        # Check if admin user already exists
        if User.objects.filter(username='admin').exists():
            self.stdout.write(self.style.WARNING('Admin user "admin" already exists'))
            return
        
        try:
            # Create superuser
            admin_user = User.objects.create_superuser(
                username='admin',
                email='admin@jobportal.com',
                password='admin123'
            )
            self.stdout.write(self.style.SUCCESS('✅ Admin user created successfully!'))
            self.stdout.write(self.style.SUCCESS('Username: admin'))
            self.stdout.write(self.style.SUCCESS('Password: admin123'))
            self.stdout.write(self.style.SUCCESS('Admin URL: http://127.0.0.1:8001/admin/'))
            
        except Exception as e:
            raise CommandError(f'Error creating superuser: {e}')
