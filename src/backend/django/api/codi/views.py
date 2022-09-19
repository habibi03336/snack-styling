
from rest_framework import mixins
from django.forms import model_to_dict
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from drf_spectacular.utils import extend_schema, extend_schema_view
from api.libs import isSelfRequest

from api.codi.paginations import CodiListPagination
from api.codi.serializers import CodiSerializer, CodiUserSerializer, CodiCreateSerializer, CodiUserCreateSerializer, CodiListSerializer
from api.permissions import UserAccessPermission

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
class CodiViewSet(ModelViewSet):
    queryset = Codi.objects.all()
    serializer_class = CodiUserSerializer
    pagination_class = CodiListPagination
    permission_classes = [UserAccessPermission]

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
        if self.action == 'update':
            return CodiSerializer
        if self.action == 'destroy':
            return CodiSerializer
        if self.action == 'list':
            return CodiListSerializer
        if self.action == 'dup_create':
            return CodiUserSerializer
        return self.serializer_class

    @action(detail=True, methods=['post'], url_path='dup_create')
    def dup_create(self, request, *args, **kwargs):
        instance = self.get_object()
        raw_data = model_to_dict(instance, exclude=['id', 'userId'])
        
        request.data._mutable = True
        request.data.update(raw_data)
        request.data._mutable = False
        
        return super().create(request, *args, **kwargs)


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
    permission_classes = [UserAccessPermission]

    def get_serializer_context(self):
        return {
            'request': None,
            'format': self.format_kwarg,
            'view': self
        }

    def get_queryset(self):
        pk = isSelfRequest(self.request)
        return Codi.objects.filter(userId=pk)

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'create':
            return CodiUserCreateSerializer
        if self.action == 'list':
            return CodiListSerializer
        return self.serializer_class

    def create(self, request, *args, **kwargs):
        setattr(request.data, '_mutable', True)
        request.data['userId'] = isSelfRequest(request)
        return super().create(request, *args, **kwargs)
