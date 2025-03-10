# Generated by Django 5.1.7 on 2025-03-08 03:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0004_remove_userbalance_last_update_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userbalance',
            name='created_at',
        ),
        migrations.AddField(
            model_name='userbalance',
            name='last_updated',
            field=models.DateField(auto_now=True),
        ),
    ]
