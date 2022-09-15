from rest_framework import permissions

class UserAccessPermission(permissions.BasePermission):
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        print(request.content_type)
        print(view)
        return True