# Generated by Django 5.1.7 on 2025-03-08 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0002_userbalance_daily_updates'),
    ]

    operations = [
        migrations.AddField(
            model_name='userbalance',
            name='last_update_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
