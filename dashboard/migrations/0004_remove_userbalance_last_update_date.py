# Generated by Django 5.1.7 on 2025-03-08 03:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0003_userbalance_last_update_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userbalance',
            name='last_update_date',
        ),
    ]
