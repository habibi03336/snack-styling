from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from api.tag.serializers import TagSerializer
from model.tagmodel.models import Tag

from drf_spectacular.utils import extend_schema

class TagViewSet(mixins.ListModelMixin,
                 GenericViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    
    @extend_schema(summary="태그 데이터 목록 출력")
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)