import requests
from rest_framework import permissions

from api.cloth.libs import decodeJWTPayload

class UserAccessPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # if request.method in permissions.SAFE_METHODS:
        #     return True
        token = request.META.get('HTTP_AUTHORIZATION')
        url = 'http://backend-spring:8080/api/v1/accounts/token'
        res = requests.get(url, headers={'Authorization': token})
        # print(res)
        if res.status_code == requests.codes.ok:
            return True
        
        return False