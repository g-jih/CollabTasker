import datetime
from datetime import timezone

from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect, resolve_url
from django.template import loader
from django.urls import reverse
from django.views import generic

from tasks.forms import TaskForm
from tasks.models import Task, Item, TaskLog


class IndexView(generic.ListView):
    template_name = '../templates/tasks/index.html'
    context_object_name = 'task_list'

    def get_queryset(self):
        return Task.objects.all()


class DetailView(generic.DetailView):
    model = Task
    template_name = '../templates/tasks/detail.html'


def detail(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    task_log = TaskLog.objects.filter(task=task_id)
    return render(request, 'tasks/detail.html', {
        'task': task,
        'tasklog': task_log,
        #'taskcomment': task_comment,
    })


def create(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save(commit=False)
            task.user = request.user
            task.created_at = datetime.datetime.now()
            task.save()
            return HttpResponseRedirect(reverse('tasks:detail', args=(task.id,)))
    else:
        form = TaskForm()
    return render(request, 'tasks/create.html', {'form': form})


def update(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            task = form.save(commit=False)
            task.save()
            return HttpResponseRedirect(reverse('tasks:detail', args=(task.id,)))
    else:
        form = TaskForm(instance=task)
        return render(request, 'tasks/update.html', {'form': form})


def delete(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    task.delete()
    return HttpResponseRedirect(reverse('tasks:index'))


