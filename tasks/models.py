from django.contrib.auth.models import User
from django.db import models
from django.db.models import PROTECT, CASCADE


class Item(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name


class Progress(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Task(models.Model):
    name = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    progress = models.ForeignKey(Progress, on_delete=PROTECT)
    achievement = models.IntegerField(default=0)
    created_at = models.DateTimeField(null=True)

    def __str__(self):
        return self.name


class Participant(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    item = models.ForeignKey(Item, on_delete=CASCADE)


class TaskLog(models.Model):
    task = models.ForeignKey(Task, on_delete=CASCADE)
    user = models.ForeignKey(User, on_delete=CASCADE)
    content = models.TextField(null=True)
    progress = models.ForeignKey(Progress, on_delete=PROTECT)
    achievement = models.IntegerField(null=True)
    published_at = models.DateTimeField(null=True)

    def __str__(self):
        return self.content


class TaskComment(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    task_log = models.ForeignKey(TaskLog, on_delete=CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(null=True)
    modified_at = models.DateField(null=True)

    def __str__(self):
        return self.content


