# Generated by Django 5.1.7 on 2025-03-08 03:58

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0006_remove_userbalance_last_updated_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userbalance',
            name='last_updated',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
