from base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'xuncha',
        'USER': 'root',
        'PASSWORD': 'root533',
        'HOST': '127.0.0.1', 
        'PORT': '5432', 
    },
}