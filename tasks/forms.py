from django import forms
from .models import Task


class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ('name', 'start_date', 'end_date', 'progress', 'achievement')
