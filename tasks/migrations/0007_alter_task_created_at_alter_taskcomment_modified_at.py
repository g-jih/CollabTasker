# Generated by Django 4.0.3 on 2022-03-28 15:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0006_alter_task_created_at_alter_taskcomment_modified_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 29, 0, 15, 26, 567703)),
        ),
        migrations.AlterField(
            model_name='taskcomment',
            name='modified_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 29, 0, 15, 26, 571697), null=True),
        ),
    ]
