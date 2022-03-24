from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('task/', include('tasks.urls')),
    path('account/', include('accounts.urls')),
]
