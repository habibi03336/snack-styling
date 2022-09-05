from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from drf_spectacular.utils import extend_schema, extend_schema_view

from api.codi.paginations import CodiListPagination
from api.codi.serializers import CodiSerializer, CodiCreateSerializer, CodiUserCreateSerializer, CodiListSerializer

from model.codimodel.models import Codi

import api.codi.schemas as exampleSchema


@extend_schema_view(
    create=extend_schema(
        summary="코디 등록",
        tags=["Codi"],
        responses=CodiCreateSerializer,
        # examples=[exampleSchema.CODI_CREATE_RESPONSE_EXAMPLE]
    ),
    list=extend_schema(
        summary="모든 코디 리스트 출력",
        tags=["Codi"],
        responses=CodiListSerializer,
        examples=[exampleSchema.CODI_LIST_EXAMPLE]
    ),
    retrieve=extend_schema(
        summary="코디 상세정보 출력",
        tags=["Codi"],
        examples=[exampleSchema.CODI_RETRIEVE_EXAMPLE]
    ),
)
class CodiViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet):
    queryset = Codi.objects.all()
    serializer_class = CodiSerializer
    pagination_class = CodiListPagination

    def get_serializer_context(self):
        return {
            'request': None,
            'format': self.format_kwarg,
            'view': self
        }

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'create':
            return CodiCreateSerializer
        if self.action == 'retrieve':
            return CodiListSerializer
        if self.action == 'list':
            return CodiListSerializer
        return self.serializer_class


@extend_schema_view(
    create=extend_schema(
        summary="userId 기반 코디 등록",
        tags=["Codi"],
        request=CodiCreateSerializer,
        examples=[exampleSchema.CODI_CREATE_RESPONSE_EXAMPLE],
    ),
    list=extend_schema(
        summary="userId 기반 코디 리스트 출력",
        tags=["Codi"],
        responses=CodiListSerializer,
        examples=[exampleSchema.CODI_LIST_EXAMPLE]
    )
)
class CodiUserViewSet(mixins.CreateModelMixin,
                      mixins.ListModelMixin,
                      GenericViewSet):
    serializer_class = CodiSerializer
    pagination_class = CodiListPagination

    def get_serializer_context(self):
        return {
            'request': None,
            'format': self.format_kwarg,
            'view': self
        }

    def get_queryset(self):
        user = self.kwargs['userId']
        return Codi.objects.filter(userId=user)

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'create':
            return CodiUserCreateSerializer
        if self.action == 'list':
            return CodiListSerializer
        return self.serializer_class

    def create(self, request, *args, **kwargs):
        setattr(request, '_mutable', True)
        request.data['userId'] = self.kwargs['userId']
        return super().create(request, *args, **kwargs)
