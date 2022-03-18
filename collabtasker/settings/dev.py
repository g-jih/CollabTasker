from ._base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'collabtasker',
        'USER': 'admin',
        'PASSWORD': '0818',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}