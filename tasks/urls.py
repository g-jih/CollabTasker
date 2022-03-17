from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from .views import TaskList, TaskDetail, TaskLogDetail, TaskCommentDetail

app_name = 'tasks'
urlpatterns = [
    path('', TaskList.as_view()),
    path('<int:taskid>/', TaskDetail.as_view()),
    path('<int:taskid>/', TaskLogDetail.as_view()),
    path('<int:tasklogid>/', TaskCommentDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)