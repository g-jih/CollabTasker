from rest_framework import serializers

from tasks.models import Task, TaskLog, TaskComment, Item, ProgressType


class TaskGetSerializer(serializers.ModelSerializer):
    def getUsername(self, obj):
        return obj.user.username

    def getItemName(self, obj):
        return obj.item.name

    def getProgressTypeName(self, obj):
        return obj.progress_type.name

    username = serializers.SerializerMethodField("getUsername")
    itemname = serializers.SerializerMethodField("getItemName")
    progressname = serializers.SerializerMethodField("getProgressTypeName")

    class Meta:
        model = Task
        fields = ('id', 'username', 'user', 'itemname', 'item', 'name', 'start_date', 'end_date',
                  'progress_type', 'progressname', 'achievement', 'created_at')


class TaskPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class TaskLogSerializer(serializers.ModelSerializer):
    def getUsername(self, obj):
        return obj.user.username

    def getProgressTypeName(self, obj):
        return obj.progress_type.name

    username = serializers.SerializerMethodField("getUsername")
    progressname = serializers.SerializerMethodField("getProgressTypeName")

    class Meta:
        model = TaskLog
        fields = ('id', 'user', 'username', 'content', 'progress_type', 'progressname', 'achievement', 'published_at')


class TaskCommentSerializer(serializers.ModelSerializer):
    def getUsername(self, obj):
        return obj.user.username

    username = serializers.SerializerMethodField("getUsername")

    class Meta:
        model = TaskComment
        fields = ('id', 'username', 'user', 'task_log', 'content', 'created_at', 'modified_at')


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class ProgressTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgressType
        fields = '__all__'
