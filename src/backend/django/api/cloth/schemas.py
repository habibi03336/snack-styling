from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample

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
    responses=None,
    examples=[
        OpenApiExample(
            name="Query example",
            request_only=True,
            value={
                "clothes": [
                    {
                        "id": 13,
                        "tags": [1, 2, 3]
                    },
                    {
                        "id": 14,
                        "tags": [3, 4]
                    },
                ]
            }
        )
    ]
)

CLOTHUSER_SCHEMA_CREATE = extend_schema(
    summary="userId 기반 옷 이미지 등록",
    tags=["Cloth/User"],
)
CLOTHUSER_SCHEMA_LIST = extend_schema(
    summary="userId 기반 옷 리스트 출력",
    tags=["Cloth/User"],
    parameters=[OpenApiParameter(name='category', type=str, required=False)]

)
