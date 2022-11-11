from rest_framework import status
from rest_framework.exceptions import APIException


class DuplicateCodiplanException(APIException):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "해당 날짜에 이미 등록된 코디가 있습니다."
    default_code = "DATA_DUPLICATED"