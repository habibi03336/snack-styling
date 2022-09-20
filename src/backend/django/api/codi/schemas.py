from drf_spectacular.utils import OpenApiExample, OpenApiParameter, extend_schema


CODI_SCHEMA_CREATE = extend_schema(
    summary="코디 등록",
    tags=["Codi"],
),
CODI_SCHEMA_RETRIEVE = extend_schema(
    summary="코디 상세정보 출력",
    tags=["Codi"],
),
CODI_SCHEMA_LIST = extend_schema(
    summary="모든 코디 리스트 출력",
    tags=["Codi"],
),
CODI_SCHEMA_PARTIAL_UPDATE = extend_schema(
    summary="코디 수정",
    tags=["Codi"],
),
CODI_SCHEMA_DESTROY = extend_schema(
    summary="코디 삭제",
    tags=["Codi"],
),
CODI_SCHEMA_DUP = extend_schema(
    summary="채택 시 코디 저장",
    tags=["Codi"],
),

CODIUSER_SCHEMA_CREATE = extend_schema(
    summary="사용자 기반 코디 등록",
    tags=["Codi/User"],
),
CODIUSER_SCHEMA_LIST = extend_schema(
    summary="사용자 기반 코디 리스트 출력",
    tags=["Codi/User"],
)


# CODI_CREATE_RESPONSE_EXAMPLE = OpenApiExample(
#     response_only=True,
#     name="success_example",
#     value={
#         "id": 4
#     }
# )
# CODI_LIST_EXAMPLE = OpenApiExample(
#     response_only=True,
#     name="success_example",
#     value=[
#         {
#             "id": 4,
#             "top": "http://testurl.img/top/1",
#             "bottom": "http://testurl.img/bottom/7",
#         },
#         {
#             "id": 5,
#             "top": "http://testurl.img/top/2",
#             "bottom": "http://testurl.img/bottom/6",
#         }
#     ]
# )
# CODI_RETRIEVE_EXAMPLE = OpenApiExample(
#     response_only=True,
#     name="success_example",
#     value={
#         "id": 4,
#         "top": "http://testurl.img/top/1",
#         "bottom": "http://testurl.img/bottom/7",
#     },
# )
