from drf_spectacular.utils import OpenApiExample

TAG_LIST_EXAMPLE = OpenApiExample(
    response_only=True,
    name="success_example",
    value=[
        {
            "id": 1,
            "category_id": 1,
            "name": "봄"
        },
        {
            "id": 2,
            "category_id": 1,
            "name": "여름"
        },
        {
            "id": 3,
            "category_id": 1,
            "name": "가을"
        },
        {
            "id": 4,
            "category_id": 1,
            "name": "겨울"
        },
        {
            "id": 5,
            "category_id": 100,
            "name": "상의"
        },
        {
            "id": 6,
            "category_id": 100,
            "name": "하의"
        }
    ]
)
