from datetime import datetime

from django.contrib.auth.models import User
from django.db import models
from django.db.models import PROTECT, CASCADE


class Item(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name


class ProgressType(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Task(models.Model):
    name = models.TextField()
    user = models.ForeignKey(User, on_delete=PROTECT)
    item = models.ForeignKey(Item, on_delete=PROTECT)
    start_date = models.DateField()
    end_date = models.DateField()
    progress_type = models.ForeignKey(ProgressType, on_delete=PROTECT, default=1)
    achievement = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return self.name

    @property
    def user_name(self):
        return self.user.username


class Participant(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    task = models.ForeignKey(Task, on_delete=CASCADE, null=True)


class TaskLog(models.Model):
    task = models.ForeignKey(Task, on_delete=CASCADE)
    user = models.ForeignKey(User, on_delete=CASCADE)
    content = models.TextField(null=True)
    progress_type = models.ForeignKey(ProgressType, on_delete=PROTECT, default=1)
    achievement = models.IntegerField(null=True)
    published_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

    @property
    def user_name(self):
        return self.user.username


class TaskComment(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    task_log = models.ForeignKey(TaskLog, on_delete=CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(null=True, auto_now_add=True)
    modified_at = models.DateField(null=True, default=datetime.now())

    def __str__(self):
        return self.content


