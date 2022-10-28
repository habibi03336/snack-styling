from .base import *

# Note: Use S3 in local test. And CORS, CSRF option ON.
# SECURITY settings
DEBUG = False
ALLOWED_HOSTS = ['*']

# S3 Configuration Options
AWS_S3_ACCESS_KEY_ID = env('AWS_S3_ACCESS_KEY_ID')
AWS_S3_SECRET_ACCESS_KEY = env('AWS_S3_SECRET_ACCESS_KEY')
AWS_REGION = 'ap-northeast-2'
AWS_S3_CUSTOM_DOMAIN = env('AWS_S3_CUSTOM_DOMAIN')

# S3 Storages Configuration Options
AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
AWS_S3_CUSTOM_DOMAIN = '%s.s3.%s.amazonaws.com' % (
    AWS_STORAGE_BUCKET_NAME, AWS_REGION)
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

CORS_ALLOWED_ORIGINS = [
    'https://www.snackstyling.com',
]

CSRF_TRUSTED_ORIGINS = [
    'https://www.snackstyling.com'
]
