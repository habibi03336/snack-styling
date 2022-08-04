from collections import OrderedDict

from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.pagination import PageNumberPagination

from drf_spectacular.utils import extend_schema

from api.codi.serializers import CodiSerializer, CodiCreateSerializer, CodiUserCreateSerializer, CodiListSerializer

from model.codimodel.models import Codi

import api.codi.schemas as exampleSchema


class CodiListPagination(PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('codiList', data),
            ('pageCnt', self.page.paginator.num_pages),
            ('curPage', self.page.number),
        ]))

    def get_paginated_response_schema(self, schema):
        return {
            'type': 'object',
            'properties': {
                'codiList': schema,
                'pageCnt': {
                    'type': 'integer',
                    'example': 12,
                },
                'curPage': {
                    'type': 'integer',
                    'example': 1,
                }
            }
        }


class CodiViewSet(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet):
    queryset = Codi.objects.all()
    serializer_class = CodiSerializer
    pagination_class = CodiListPagination

    @extend_schema(
        summary="코디 등록",
        tags=["Codi"],
        responses=CodiCreateSerializer,
        examples=[exampleSchema.CODI_CREATE_RESPONSE_EXAMPLE]
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        summary="모든 코디 리스트 출력",
        tags=["Codi"],
        responses=CodiListSerializer,
        examples=[exampleSchema.CODI_LIST_EXAMPLE]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'create':
            return CodiCreateSerializer
        if self.action == 'list':
            return CodiListSerializer
        return self.serializer_class


class CodiRetrieveViewSet(mixins.RetrieveModelMixin,
                          GenericViewSet):
    queryset = Codi.objects.all()
    serializer_class = CodiListSerializer

    @extend_schema(
        summary="코디 상세정보 출력",
        tags=["Codi"],
        examples=[exampleSchema.CODI_RETRIEVE_EXAMPLE]
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


class CodiUserViewSet(mixins.CreateModelMixin,
                      mixins.ListModelMixin,
                      GenericViewSet):
    serializer_class = CodiSerializer
    pagination_class = CodiListPagination

    def get_queryset(self):
        user = self.kwargs['userId']
        return Codi.objects.filter(userId=user)

    @extend_schema(
        summary="userId 기반 코디 리스트 출력",
        tags=["Codi"],
        responses=CodiListSerializer,
        examples=[exampleSchema.CODI_LIST_EXAMPLE]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(
        summary="userId 기반 코디 등록",
        tags=["Codi"],
        request=CodiCreateSerializer,
        examples=[exampleSchema.CODI_CREATE_RESPONSE_EXAMPLE],
    )
    def create(self, request, *args, **kwargs):
        setattr(request.data, '_mutable', True)
        request.data['userId'] = self.kwargs['userId']
        return super().create(request, *args, **kwargs)

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'create':
            return CodiUserCreateSerializer
        if self.action == 'list':
            return CodiListSerializer
        return self.serializer_class
