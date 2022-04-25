from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.response import Response

from tasks.models import Task, TaskLog, TaskComment, Item, ProgressType, Participant


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = [
            'id',
            'user',
            'username',
            'task',
        ]


class TaskGetSerializer(serializers.ModelSerializer):
    participants = ParticipantSerializer(many=True, default=None)

    class Meta:
        model = Task
        fields = [
            'id',
            'username',
            'user',
            'name',
            'start_date',
            'end_date',
            'progress_type',
            'progressname',
            'achievement',
            'created_at',
            'participants',
        ]


class TaskDetailSerializer(serializers.ModelSerializer):
    participant_list = serializers.ListField(default=None)
    participants = ParticipantSerializer(many=True, default=None)

    class Meta:
        model = Task
        fields = [
            "id",
            "name",
            "start_date",
            "end_date",
            "item",
            "itemname",
            "progress_type",
            "progressname",
            "achievement",
            "created_at",
            "user",
            "participants",
            "participant_list",
        ]

        def list(self, request, *args, **kwargs):
            queryset = self.filter_queryset(self.get_queryset())

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

        def update(self, instance, validated_data, *args, **kwargs):
            participant_list = validated_data.pop('participant_list', None)
            validated_data.pop('participants', None)
            task = Task.objects.update(user=instance.user, **validated_data)
            if participant_list is not None:
                Participant.objects.filter(task=instance.pk).delete()

                for participant_id in participant_list:
                    user = User.objects.get(pk=participant_id)
                    Participant.objects.create(user=user, task=task)

            return instance


class TaskCreateSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    participant_list = serializers.ListField(default=None)
    participants = ParticipantSerializer(many=True, default=None)

    class Meta:
        model = Task
        fields = [
            "id",
            "name",
            "start_date",
            "end_date",
            "item",
            "progress_type",
            "achievement",
            "created_at",
            "user",
            "participants",
            "participant_list",
        ]

    def create(self, validated_data, *args, **kwargs):
        print('create!!')
        participant_list = validated_data.pop('participant_list', None)
        validated_data.pop('participants', None)
        task = Task.objects.create(**validated_data)
        if participant_list is not None:
            for participant_id in participant_list:
                user = User.objects.get(pk=participant_id)
                Participant.objects.create(user=user, task=task)
        return task


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

