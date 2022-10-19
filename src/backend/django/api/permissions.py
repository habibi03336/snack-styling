import requests
from django.conf import settings
from rest_framework import permissions, status
from api.exceptions import AccessTokenExpired, AuthServerConnectionError

from api.libs import decodeJWTPayload, mutableCheck


class UserAccessPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if settings.DEBUG == True:
            mutableCheck(request)
            return True
        token = request.META.get('HTTP_AUTHORIZATION')
        url = 'https://spring-server:8080/api/v1/accounts/token'
        try:
            res = requests.get(url, headers={'Authorization': token})

        except requests.exceptions.ConnectionError as e:
            print("ConnectionError:", e)
            raise AuthServerConnectionError

        if res.status_code == requests.codes.ok:
            mutableCheck(request)
            return True
        elif res.status_code == status.HTTP_426_UPGRADE_REQUIRED:
            raise AccessTokenExpired

        return False

    def has_object_permission(self, request, view, obj):
        if obj.userId == 1:
            return True

        token = request.META.get('HTTP_AUTHORIZATION')

        if obj.userId == decodeJWTPayload(token):
            return True
        return False
