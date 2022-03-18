import datetime
from datetime import timezone

from django.http import Http404
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from tasks.models import Task, TaskLog, TaskComment, ProgressType, Item
from tasks.serializers import TaskLogSerializer, TaskCommentSerializer, ItemSerializer, \
    ProgressTypeSerializer, TaskPostSerializer, TaskGetSerializer


class TaskList(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskGetSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetail(APIView):
    def get_object(self, taskid):
        try:
            return Task.objects.get(pk=taskid)
        except Task.DoesNotExist:
            raise Http404

    def get(self, request, taskid, format=None):
        task = self.get_object(taskid)
        serializer = TaskGetSerializer(task)
        return Response(serializer.data)

    def put(self, request, taskid, format=None):
        task = self.get_object(taskid)
        serializer = TaskPostSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, taskid, format=None):
        task = self.get_object(taskid)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskLogList(APIView):
    def get(self, request, taskid):
        tasklogs = TaskLog.objects.filter(task=taskid)
        serializer = TaskLogSerializer(tasklogs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskLogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TaskLogDetail(APIView):
    def get_object(self, tasklogid):
        try:
            return TaskLog.objects.get(pk=tasklogid)
        except TaskLog.DoesNotExist:
            raise Http404

    def get(self, request, tasklogid, format=None):
        task_log = self.get_object(tasklogid)
        user = self.get_object(task_log.user)
        serializer = TaskLogSerializer(task_log)
        return Response(serializer.data)

    def put(self, request, tasklogid, format=None):
        task_log = self.get_object(tasklogid)
        serializer = TaskLogSerializer(task_log, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, tasklogid, format=None):
        task_log = self.get_object(tasklogid)
        task_log.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskCommentList(ListAPIView):
    def get(self, request, tasklogid):
        taskcomments = TaskComment.objects.filter(task_log=tasklogid)
        serializer = TaskCommentSerializer(taskcomments, many=True)
        return Response(serializer.data)


class TaskCommentDetail(APIView):
    def get_object(self, taskcommentid):
        try:
            return TaskComment.objects.get(pk=taskcommentid)
        except TaskComment.DoesNotExist:
            raise Http404

    def get(self, request, taskcommentid, format=None):
        task_comment = self.get_object(taskcommentid)
        serializer = TaskCommentSerializer(task_comment)
        return Response(serializer.data)

    def put(self, request, taskcommentid, format=None):
        task_comment = self.get_object(taskcommentid)
        serializer = TaskCommentSerializer(task_comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, taskcommentid, format=None):
        task_comment = self.get_object(taskcommentid)
        task_comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ItemList(APIView):
    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)


class ProgressTypeList(APIView):
    def get(self, request):
        items = ProgressType.objects.all()
        serializer = ProgressTypeSerializer(items, many=True)
        return Response(serializer.data)


