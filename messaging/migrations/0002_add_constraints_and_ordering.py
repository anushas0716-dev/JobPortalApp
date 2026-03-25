# Generated migration for messaging app improvements

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='conversation',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['created_at']},
        ),
        migrations.AlterUniqueTogether(
            name='conversation',
            unique_together={('candidate', 'employer')},
        ),
    ]
