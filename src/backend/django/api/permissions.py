from rest_framework import permissions

from api.cloth.libs import decodeJWTPayload

class UserAccessPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # if request.method in permissions.SAFE_METHODS:
        #     return True
        token = request.META.get('HTTP_AUTHORIZATION')
        decodeJWTPayload(token)
        # print(view)
        return True