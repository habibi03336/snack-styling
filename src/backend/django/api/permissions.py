import requests
from rest_framework import permissions

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
        except requests.exceptions.ConnectionError as e:
            print("ConnectionError:", e)
        
        
        return False
    
    def has_object_permission(self, request, view, obj):
        if obj.userId == 1:
            return True
        token = request.META.get('HTTP_AUTHORIZATION')
        
        if obj.userId == decodeJWTPayload(token):
            return True
        return False