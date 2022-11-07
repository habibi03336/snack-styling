from .base import *

# Note: Not use S3 in local test. And CORS, CSRF option OFF.
# SECURITY settings
DEBUG = True
ALLOWED_HOSTS = ['*']

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'src/db.sqlite3',
    }
}

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True

CSRF_TRUSTED_ORIGINS = (
    'http://*:*',
)
