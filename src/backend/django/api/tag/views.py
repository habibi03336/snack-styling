from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from drf_spectacular.utils import extend_schema

from api.tag.serializers import TagSerializer

from model.tagmodel.models import Tag

import api.tag.schemas as exampleSchema

class TagViewSet(mixins.ListModelMixin,
                 GenericViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    
    @extend_schema(
        summary="태그 데이터 목록 출력",
        examples=[exampleSchema.TAG_LIST_EXAMPLE],
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)