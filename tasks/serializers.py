from rest_framework import serializers

from tasks.models import Task, TaskLog, TaskComment


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'name', 'start_date', 'end_date', 'progress', 'achievement', 'created_at')


class TaskLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskLog
        fields = ('id', 'task', 'user', 'content', 'progress', 'achievement', 'published_at')


class TaskCommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskComment
        fields = ('id', 'user', 'task_log', 'content', 'created_at', 'modified_at')