from drf_spectacular.utils import OpenApiExample, OpenApiParameter, extend_schema

from api.cloth.serializers import ClothTagSerializer


CLOTH_SCHEMA_CREATE = extend_schema(
    summary="옷 이미지 등록",
    tags=["Cloth"],
)
CLOTH_SCHEMA_RETRIEVE = extend_schema(
    summary="옷 상세정보 출력",
    tags=["Cloth"],
)
CLOTH_SCHEMA_PARTIAL_UPDATE = extend_schema(
    summary="개별 옷 정보 업데이트",
    tags=["Cloth"],
)
CLOTH_SCHEMA_DESTROY = extend_schema(
    summary="개별 옷 삭제(수정필요)",
    tags=["Cloth"],
)
CLOTH_SCHEMA_LIST = extend_schema(
    summary="모든 옷 리스트를 출력",
    tags=["Cloth"],
)
CLOTH_SCHEMA_MULTI_UPDATE = extend_schema(
    summary="여러 옷 세부정보 업데이트",
    tags=["Cloth"],
    request=ClothTagSerializer(many=True),
    responses=None
)

CLOTHUSER_SCHEMA_CREATE =extend_schema(
        summary="userId 기반 옷 이미지 등록",
        tags=["Cloth/User"],
    )
CLOTHUSER_SCHEMA_LIST =extend_schema(
        summary="userId 기반 옷 리스트 출력",
        tags=["Cloth/User"],
    )

# CLOTH_LIST_EXAMPLE = OpenApiExample(
#     response_only=True,
#     name="success_example",
#     value=[
#         {
#             "id": 1,
#             "category": "상의",
#             "image": "http://127.0.0.1:8000/media/cloth/2022/07/18/0u6yk5ihhp.jpg",
#             "create_dt": "2022-07-18T07:27:00.128016Z",
#             "tags": [
#                 "봄",
#                 "상의"
#             ]
#         },
#         {
#             "id": 2,
#             "category": "하의",
#             "image": "http://127.0.0.1:8000/media/cloth/2022/07/19/2.jpg",
#             "create_dt": "2022-07-19T04:40:21.872461Z",
#             "tags": [
#                 "봄",
#                 "하의"
#             ]
#         }
#     ],

# )

# CLOTH_TAG_UPDATE_EXAMPLE = OpenApiExample(
#     ""
# )
# CLOTH_TAG_UPDATE_QUERY_EXAMPLE = \
#     OpenApiExample(
#         name="Query example",
#         request_only=True,
#         value={
#             "clothes": [
#                 {
#                     "id": 13,
#                     "tags": [1, 2, 3]
#                 },
#                 {
#                     "id": 14,
#                     "tags": [3, 4]
#                 },
#             ]
#         }
#     )
