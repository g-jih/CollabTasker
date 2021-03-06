import os

SETTINGS_MODULE = os.environ.get('DJANGO_SETTINGS_MODULE')

if not SETTINGS_MODULE or SETTINGS_MODULE == 'config.settings':
    from .dev import *

elif SETTINGS_MODULE == 'config.settings.prod':
    from .prod import *
