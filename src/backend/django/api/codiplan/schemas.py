from drf_spectacular.utils import extend_schema


CODIPLAN_SCHEMA_DEFAULT = extend_schema(
    tags=['Codiplan']
)

CODIPLANUSER_SCHEMA_CREATE = extend_schema(
    summary="사용자 기반, 날짜에 코디 등록",
    tags=["Codiplan/User"],
),
CODIPLANUSER_SCHEMA_LIST = extend_schema(
    summary="사용자 기반, 코디 목록 불러오기",
    tags=["Codiplan/User"],
),