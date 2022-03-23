# Generated by Django 4.0.3 on 2022-03-23 14:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_remove_participant_item_participant_task_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 23, 23, 59, 52, 155190)),
        ),
        migrations.AlterField(
            model_name='taskcomment',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 23, 23, 59, 52, 157193), null=True),
        ),
        migrations.AlterField(
            model_name='taskcomment',
            name='modified_at',
            field=models.DateField(default=datetime.datetime(2022, 3, 23, 23, 59, 52, 157193), null=True),
        ),
        migrations.AlterField(
            model_name='tasklog',
            name='published_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 23, 23, 59, 52, 156189)),
        ),
    ]
