from django.contrib import admin

from .models import Item, ProgressType, Task, TaskComment, TaskLog, Participant

admin.site.register(Item)
admin.site.register(ProgressType)
admin.site.register(Task)
admin.site.register(TaskLog)
admin.site.register(TaskComment)
admin.site.register(Participant)