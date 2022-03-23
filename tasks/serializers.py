from django.contrib.auth.models import User
from rest_framework import serializers

from tasks.models import Task, TaskLog, TaskComment, Item, ProgressType, Participant


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'


class TaskGetSerializer(serializers.ModelSerializer):
    participants = ParticipantSerializer(many=True, default=None)

    def getUsername(self, obj):
        return obj.user.username

    def getProgressTypeName(self, obj):
        return obj.progress_type.name

    def getParticipants(self, obj):
        users = Participant.objects.filter(task=obj).values('user')
        participants = []
        for participant in users:
            participants.append(User.objects.get(id=participant['user']).username)
        return participants

    username = serializers.SerializerMethodField("getUsername")
    progressname = serializers.SerializerMethodField("getProgressTypeName")
    participants = serializers.SerializerMethodField("getParticipants")

    class Meta:
        model = Task
        fields = ['id',
                  'username',
                  'user',
                  'name',
                  'participants',
                  'start_date',
                  'end_date',
                  'progress_type',
                  'progressname',
                  'achievement',
                  'created_at']


class TaskDetailSerializer(serializers.ModelSerializer):
    participants = serializers.ListField(default=None)

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
            "participants",
        ]

        def create(self, validated_data, *args, **kwargs):
            participants = validated_data.pop("participants", None)
            task = Task.objects.create(**validated_data)
            for participant in participants["participants"]:
                Participant.objects.create(user=participant, task=task)
            return task

        def update(self, instance, validated_data, *args, **kwargs):
            participant_names = validated_data.pop("participants", None)
            task_id = kwargs["task_id"]
            Task.objects.update(**validated_data)
            prev_participants = Participant.objects.filter(task=task_id)
            for participant_name in participant_names:
                if prev_participants.filter(name=participant_name).count() == 0:
                    Participant.objects.create(name=participant_name, task=task_id)
                participant_names.remove(participant_name)
            for prev_participant in prev_participants:
                Participant.objects.delete(prev_participant)
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
