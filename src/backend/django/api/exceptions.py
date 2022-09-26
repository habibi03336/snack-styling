from rest_framework import status
from rest_framework.exceptions import APIException

class AuthServerConnectionError(APIException):
    status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    default_detail = "AUTH_SERVER_CONNECTION_ERROR"
    default_code = "AUTH_SERVER_CONNECTION_ERROR"
    

class AlreadyTerminated(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "ALREADY_TERMINATED"
    default_code = "ALREADY_TERMINATED"
    
class AccessTokenExpired(APIException):
    status_code = status.HTTP_426_UPGRADE_REQUIRED
    default_detail = "ACCESS_TOKEN_EXPIRED"
    default_code = "ACCESS_TOKEN_EXPIRED"