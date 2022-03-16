from django.contrib import admin

from .models import Item, Progress, Task, TaskComment, TaskLog

admin.site.register(Item)
admin.site.register(Progress)
admin.site.register(Task)
admin.site.register(TaskLog)
admin.site.register(TaskComment)