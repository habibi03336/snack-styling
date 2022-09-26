import requests
from rest_framework import permissions, status
from api.exceptions import AccessTokenExpired, AuthServerConnectionError

from api.libs import decodeJWTPayload, mutableCheck, readEnvValue

class UserAccessPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if readEnvValue('DEBUG') == 'True':
            mutableCheck(request)
            return True
        token = request.META.get('HTTP_AUTHORIZATION')
        url = 'http://backend-spring:8080/api/v1/accounts/token'
        try:
            res = requests.get(url, headers={'Authorization': token})
            
            if res.status_code == requests.codes.ok:
                mutableCheck(request)
                return True
            elif res.status_code == status.HTTP_426_UPGRADE_REQUIRED:
                raise AccessTokenExpired
        except requests.exceptions.ConnectionError as e:
            print("ConnectionError:", e)
            raise AuthServerConnectionError
        
        
        return False
    
    def has_object_permission(self, request, view, obj):
        if obj.userId == 1:
            return True
        token = request.META.get('HTTP_AUTHORIZATION')
        
        if obj.userId == decodeJWTPayload(token):
            return True
        return False