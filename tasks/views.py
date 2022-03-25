from django.http import Http404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import ListAPIView, GenericAPIView, get_object_or_404
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin, \
    RetrieveModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from tasks.models import Task, TaskLog, TaskComment, ProgressType, Item
from tasks.serializers import TaskLogSerializer, TaskCommentSerializer, ItemSerializer, \
    ProgressTypeSerializer, TaskDetailSerializer, TaskGetSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class TaskView(ListModelMixin, CreateModelMixin, GenericAPIView):
    queryset = Task.objects.order_by("-id")
    serializer_class = TaskDetailSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        print(request.user)
        print('tasklist', request.META['HTTP_AUTHORIZATION'])
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        print('request data', request.data)
        return self.create(request, *args, **kwargs)


class TaskDetailView(RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    queryset = Task.objects.order_by("-id")
    serializer_class = TaskDetailSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        self.serializer_class = TaskGetSerializer
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class TaskLogList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        task_logs = TaskLog.objects.filter(task=task_id)
        serializer = TaskLogSerializer(task_logs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskLogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskLogDetail(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, task_log_id):
        try:
            return TaskLog.objects.get(pk=task_log_id)
        except TaskLog.DoesNotExist:
            raise Http404

    def get(self, request, task_log_id):
        task_log = self.get_object(task_log_id)
        user = self.get_object(task_log.user)
        serializer = TaskLogSerializer(task_log)
        return Response(serializer.data)

    def put(self, request, task_log_id, format=None):
        task_log = self.get_object(task_log_id)
        serializer = TaskLogSerializer(task_log, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, task_log_id, format=None):
        task_log = self.get_object(task_log_id)
        task_log.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskCommentList(ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, task_log_id):
        taskcomments = TaskComment.objects.filter(task_log=task_log_id)
        serializer = TaskCommentSerializer(taskcomments, many=True)
        return Response(serializer.data)


class TaskCommentDetail(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, task_log_id):
        try:
            return TaskComment.objects.get(pk=task_log_id)
        except TaskComment.DoesNotExist:
            raise Http404

    def get(self, request, task_log_id, format=None):
        task_comment = self.get_object(task_log_id)
        serializer = TaskCommentSerializer(task_comment)
        return Response(serializer.data)

    def put(self, request, task_log_id, format=None):
        task_comment = self.get_object(task_log_id)
        serializer = TaskCommentSerializer(task_comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, task_log_id, format=None):
        task_comment = self.get_object(task_log_id)
        task_comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ItemList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)


class ProgressTypeList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = ProgressType.objects.all()
        serializer = ProgressTypeSerializer(items, many=True)
        return Response(serializer.data)



