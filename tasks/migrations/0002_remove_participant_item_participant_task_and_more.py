# Generated by Django 4.0.3 on 2022-03-23 14:59

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='participant',
            name='item',
        ),
        migrations.AddField(
            model_name='participant',
            name='task',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='tasks.task'),
        ),
        migrations.AlterField(
            model_name='task',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 23, 23, 59, 42, 2493)),
        ),
        migrations.AlterField(
            model_name='taskcomment',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 23, 23, 59, 42, 3491), null=True),
        ),
        migrations.AlterField(
            model_name='taskcomment',
            name='modified_at',
            field=models.DateField(default=datetime.datetime(2022, 3, 23, 23, 59, 42, 3491), null=True),
        ),
        migrations.AlterField(
            model_name='tasklog',
            name='published_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 23, 23, 59, 42, 3491)),
        ),
    ]