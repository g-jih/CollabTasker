from rest_framework import serializers

from tasks.models import Task, TaskLog, TaskComment, Item, ProgressType, Participant


class TaskGetSerializer(serializers.ModelSerializer):
    def getUsername(self, obj):
        return obj.user.username

    def getProgressTypeName(self, obj):
        return obj.progress_type.name

    username = serializers.SerializerMethodField("getUsername")
    progressname = serializers.SerializerMethodField("getProgressTypeName")

    class Meta:
        model = Task
        fields = ['id',
                  'username',
                  'user',
                  'name',
                  'start_date',
                  'end_date',
                  'progress_type',
                  'progressname',
                  'achievement',
                  'created_at']


class TaskDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            "id",
            "name",
            "start_date",
            "end_date",
            "progress_type",
            "achievement",
            "created_at",
        ]

        def create(self, validated_data, *args, **kwargs):
            task = Task.objects.create(**validated_data)
            return task

        def update(self, instance, validated_data, *args, **kwargs):
            Task.objects.update(**validated_data)
            return instance


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

