from django.contrib import admin
from django.urls import include, path

from accounts.views import SignUp, LogIn, LogOut

urlpatterns = [
    path('admin/', admin.site.urls),
    path('task/', include('tasks.urls')),
    path('signup/', SignUp.as_view()),
    path('login/', LogIn.as_view()),
    path('logout/', LogOut.as_view()),
]
