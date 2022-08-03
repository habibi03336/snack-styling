from collections import OrderedDict

from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.pagination import PageNumberPagination

from drf_spectacular.utils import extend_schema

from api.cloth.serializers import ClothSerializer, ClothDetailSerializer, ClothCreateSerializer, ClothUserCreateSerializer, ClothRetrieveUpdateSerializer, ClothTagSerializer

from model.clothmodel.models import Cloth

import api.cloth.schemas as exampleSchema


class PostPageNumberPagination(PageNumberPagination):
    page_size = 100

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('clothList', data),
            ('pageCnt', self.page.paginator.num_pages),
            ('curPage', self.page.number),
        ]))

    def get_paginated_response_schema(self, schema):
        return {
            'type': 'object',
            'properties': {
                'clothList': schema,
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

class ClothViewSet(mixins.CreateModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    queryset = Cloth.objects.all()
    serializer_class = ClothSerializer
    pagination_class = PostPageNumberPagination

    @extend_schema(
        summary="옷 이미지 등록",
        tags=["Cloth"],
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        summary="모든 옷 리스트를 출력",
        tags=["Cloth"],
        responses=ClothDetailSerializer,
        examples=[exampleSchema.CLOTH_LIST_EXAMPLE],
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'create':
            return ClothCreateSerializer
        if self.action == 'list':
            return ClothDetailSerializer
        return self.serializer_class


class ClothRetrieveViewSet(mixins.RetrieveModelMixin,
                           mixins.UpdateModelMixin,
                        #    mixins.DestroyModelMixin,
                           GenericViewSet):
    queryset = Cloth.objects.all()
    serializer_class = ClothSerializer
    
    @extend_schema(
        summary="옷 상세정보 출력",
        tags=["Cloth"],
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    @extend_schema(
        summary="개별 옷 정보 업데이트",
        tags=["Cloth"],
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'update':
            return ClothRetrieveUpdateSerializer
        if self.action == 'retrieve':
            return ClothDetailSerializer
        return self.serializer_class


class ClothUpdateAPIView(mixins.UpdateModelMixin,
                         GenericViewSet):
    queryset = Cloth.objects.all()
    serializer_class = ClothTagSerializer

    @extend_schema(
        summary="여러 옷 세부정보 업데이트",
        tags=["Cloth"],
        examples=[exampleSchema.CLOTH_TAG_UPDATE_QUERY_EXAMPLE],
        responses={200: {}}
    )
    def update(self, request, *args, **kwargs):
        print("Cloth: Partial update RUN")
        kwargs["partial"] = True
        requestData = request.data["clothes"]
        kwargs["many"] = isinstance(requestData, list)
        instance = self.get_queryset()
        print(instance)
        serializer = self.get_serializer(instance, data=requestData, **kwargs)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(None)


class ClothFilteredViewSet(mixins.ListModelMixin,
                           mixins.CreateModelMixin,
                           GenericViewSet):
    serializer_class = ClothSerializer
    pagination_class = PostPageNumberPagination
    
    def get_queryset(self):
        user = self.kwargs['userId']
        return Cloth.objects.filter(userId=user)
    
    @extend_schema(
        summary="userId 기반 옷 리스트 출력",
        tags=["Cloth"],
        responses=ClothDetailSerializer,
        examples=[exampleSchema.CLOTH_LIST_EXAMPLE],
    )    
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @extend_schema(
        summary="userId 기반 옷 이미지 등록",
        tags=["Cloth"],
        request=ClothCreateSerializer,
    )
    def create(self, request, *args, **kwargs):
        request.data['userId'] = self.kwargs['userId']
        return super().create(request, *args, **kwargs)
    
    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'create':
            return ClothUserCreateSerializer
        if self.action == 'list':
            return ClothDetailSerializer
        return self.serializer_class