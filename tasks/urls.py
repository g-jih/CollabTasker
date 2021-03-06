from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import TaskView, TaskDetailView, TaskLogDetail, TaskCommentDetail, TaskLogList, TaskCommentList, ItemList, \
    ProgressTypeList, UserList

app_name = 'tasks'

urlpatterns = [
    path('', TaskView.as_view()),
    path('<int:pk>/', TaskDetailView.as_view()),
    path('tasklogs/<int:task_id>/', TaskLogList.as_view()),
    path('tasklog/<int:task_log_id>/', TaskLogDetail.as_view()),
    path('taskcomments/<int:task_log_id>/', TaskCommentList.as_view()),
    path('taskcomment/<int:task_comment_id>/', TaskCommentDetail.as_view()),
    path('items/', ItemList.as_view()),
    path('progresstypes/', ProgressTypeList.as_view()),
    path('users/', UserList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
