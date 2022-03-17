import datetime
from datetime import timezone

from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from tasks.models import Task, TaskLog, TaskComment
from tasks.serializers import TaskSerializer, TaskLogSerializer


class TaskList(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetail(APIView):
    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        task = self.get_object(pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        task = self.get_object(pk)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        task = self.get_object(pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskLogDetail(APIView):
    def get_object(self, taskid):
        try:
            return TaskLog.objects.get(pk=taskid)
        except TaskLog.DoesNotExist:
            raise Http404

    def get(self, request, taskid, format=None):
        task_log = self.get_object(taskid)
        serializer = TaskLogSerializer(task_log)
        return Response(serializer.data)

    def put(self, request, taskid, format=None):
        task_log = self.get_object(taskid)
        serializer = TaskLogSerializer(task_log, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, taskid, format=None):
        task_log = self.get_object(taskid)
        task_log.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskCommentSerializer:
    pass


class TaskCommentDetail(APIView):
    def get_object(self, tasklogid):
        try:
            return TaskComment.objects.get(pk=tasklogid)
        except TaskComment.DoesNotExist:
            raise Http404

    def get(self, request, tasklogid, format=None):
        task_comment = self.get_object(tasklogid)
        serializer = TaskCommentSerializer(task_comment)
        return Response(serializer.data)

    def put(self, request, tasklogid, format=None):
        task_comment = self.get_object(tasklogid)
        serializer = TaskCommentSerializer(task_comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, tasklogid, format=None):
        task_comment = self.get_object(tasklogid)
        task_comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



