# Generated by Django 4.0.3 on 2022-03-18 14:20

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ProgressType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('achievement', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(default=datetime.datetime(2022, 3, 18, 23, 20, 34, 518047))),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='tasks.item')),
                ('progress_type', models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='tasks.progresstype')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TaskLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(null=True)),
                ('achievement', models.IntegerField(null=True)),
                ('published_at', models.DateTimeField(default=datetime.datetime(2022, 3, 18, 23, 20, 34, 519049))),
                ('progress_type', models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='tasks.progresstype')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tasks.task')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TaskComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(default=datetime.datetime(2022, 3, 18, 23, 20, 34, 519049), null=True)),
                ('modified_at', models.DateField(default=datetime.datetime(2022, 3, 18, 23, 20, 34, 519049), null=True)),
                ('task_log', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tasks.tasklog')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tasks.item')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
