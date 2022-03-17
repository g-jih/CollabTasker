from rest_framework import serializers

from tasks.models import Task, TaskLog, TaskComment


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class TaskLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskLog
        fields = '__all__'


class TaskCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskComment
        fields = '__all__'