from drf_spectacular.utils import extend_schema
from api.codiplan.serializers import CodiPlanSerializer


CODIPLAN_SCHEMA_DEFAULT = extend_schema(
    tags=['Codiplan']
)

CODIPLANUSER_SCHEMA_CREATE = extend_schema(
    summary="사용자 기반, 날짜에 코디 등록",
    tags=["Codiplan/User"],
)
CODIPLANUSER_SCHEMA_LIST = extend_schema(
    summary="사용자 기반, 코디 목록 불러오기",
    tags=["Codiplan/User"],
)

CODIPLANUSER_SCHEMA_UPDATE = extend_schema(
    summary="코디 수정(사용자, DATE 기반)",
    tags=["Codiplan/User"],
)

CODIPLANUSER_SCHEMA_DELETE = extend_schema(
    summary='코디 삭제(사용자, DATE 기반.) - PATCH와 같은 request 필요',
    tags=["Codiplan/User"],
    request=CodiPlanSerializer,
)
