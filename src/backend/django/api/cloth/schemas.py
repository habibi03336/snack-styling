from drf_spectacular.utils import OpenApiExample, OpenApiParameter

CLOTH_LIST_EXAMPLE = OpenApiExample(
    response_only=True,
    name="success_example",
    value=[
        {
            "id": 1,
            "category": "상의",
            "image": "http://127.0.0.1:8000/media/cloth/2022/07/18/0u6yk5ihhp.jpg",
            "create_dt": "2022-07-18T07:27:00.128016Z",
            "tags": [
                "봄",
                "상의"
            ]
        },
        {
            "id": 2,
            "category": "하의",
            "image": "http://127.0.0.1:8000/media/cloth/2022/07/19/2.jpg",
            "create_dt": "2022-07-19T04:40:21.872461Z",
            "tags": [
                "봄",
                "하의"
            ]
        }
    ],

)

CLOTH_TAG_UPDATE_EXAMPLE = OpenApiExample(
    ""
)
CLOTH_TAG_UPDATE_QUERY_EXAMPLE = \
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
