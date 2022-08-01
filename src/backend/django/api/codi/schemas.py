from drf_spectacular.utils import OpenApiExample, OpenApiParameter

CODI_CREATE_RESPONSE_EXAMPLE = OpenApiExample(
    response_only=True,
    name="success_example",
    value={
        "id": 4
    }
)
CODI_LIST_EXAMPLE = OpenApiExample(
    response_only=True,
    name="success_example",
    value=[
        {
            "id": 4,
            "top": "http://testurl.img/top/1",
            "bottom": "http://testurl.img/bottom/7",
        },
        {
            "id": 5,
            "top": "http://testurl.img/top/2",
            "bottom": "http://testurl.img/bottom/6",
        }
    ]
)
CODI_RETRIEVE_EXAMPLE = OpenApiExample(
    response_only=True,
    name="success_example",
    value={
        "id": 4,
        "top": "http://testurl.img/top/1",
        "bottom": "http://testurl.img/bottom/7",
    },
)
