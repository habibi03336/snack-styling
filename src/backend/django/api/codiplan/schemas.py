from drf_spectacular.utils import extend_schema
from api.codiplan.serializers import CodiPlanUpdateDestroySerializer, CodiPlanSerializer
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

CODIPLAN_SCHEMA_DELETE = extend_schema(
    summary='코디 삭제(codiplan/update/와 동일한 request 필요)',
    tags = ["Codiplan"],
    request=CodiPlanSerializer,
)