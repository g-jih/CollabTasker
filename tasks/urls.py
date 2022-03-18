from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from .views import TaskList, TaskDetail, TaskLogDetail, TaskCommentDetail, TaskLogList, TaskCommentList, ItemList, \
    ProgressTypeList

app_name = 'tasks'
urlpatterns = [
    path('', TaskList.as_view()),
    path('<int:taskid>/', TaskDetail.as_view()),
    path('tasklogs/<int:taskid>/', TaskLogList.as_view()),
    path('tasklog/<int:tasklogid>/', TaskLogDetail.as_view()),
    path('taskcomments/<int:tasklogid>/', TaskCommentList.as_view()),
    path('taskcomment/<int:taskcommentid>/', TaskCommentDetail.as_view()),
    path('items/', ItemList.as_view()),
    path('progresstype/', ProgressTypeList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)