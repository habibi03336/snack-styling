from .base import *

# Note: Not use S3 in local test. And CORS, CSRF option OFF.
# SECURITY settings
DEBUG = True
ALLOWED_HOSTS = ['*']

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True

CSRF_TRUSTED_ORIGINS = (
    'http://*:*',
)
