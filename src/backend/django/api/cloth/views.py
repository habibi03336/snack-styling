from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from drf_spectacular.utils import extend_schema, extend_schema_view

from api.cloth.paginations import ClothPagePagination
from api.cloth.serializers import ClothSerializer, ClothDetailSerializer, ClothCreateSerializer, ClothUserCreateSerializer, ClothRetrieveUpdateSerializer, ClothTagSerializer
from api.permissions import UserAccessPermission

from model.clothmodel.models import Cloth


@extend_schema_view(
    create=extend_schema(
        summary="옷 이미지 등록",
        tags=["Cloth"],
    ),
    retrieve=extend_schema(
        summary="옷 상세정보 출력",
        tags=["Cloth"],
    ),
    partial_update=extend_schema(
        summary="개별 옷 정보 업데이트",
        tags=["Cloth"],
    ),
    list=extend_schema(
        summary="모든 옷 리스트를 출력",
        tags=["Cloth"],
        responses=ClothDetailSerializer,
    )
)
class ClothViewSet(ModelViewSet):
    queryset = Cloth.objects.all()
    pagination_class = ClothPagePagination

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return ClothSerializer

        if self.action == 'create':
            return ClothCreateSerializer
        if self.action == 'retrieve':
            return ClothDetailSerializer
        if self.action == 'partial_update':
            return ClothRetrieveUpdateSerializer
        if self.action == 'destroy':
            return ClothSerializer
        if self.action == 'list':
            return ClothDetailSerializer
        if self.action == 'multiple_tag_update':
            return ClothTagSerializer
        return ClothSerializer

    @extend_schema(
        summary="여러 옷 세부정보 업데이트",
        tags=["Cloth"],
        request=ClothTagSerializer(many=True),
        responses=None
    )
    @action(detail=False, methods=['patch'], url_path="multi-update")
    def multiple_tag_update(self, request, *args, **kwargs):
        print("Cloth: Partial update RUN")
        requestData = request.data["clothes"]
        serializer = self.get_serializer(many=True, data=requestData)
        serializer.is_valid(raise_exception=True)
        id_list = serializer.get_id_list()
        instance = self.get_queryset().filter(id__in=id_list)
        serializer.instance = instance
        serializer.save()
        return Response(serializer.data)


@extend_schema_view(
    create=extend_schema(
        summary="userId 기반 옷 이미지 등록",
        tags=["Cloth"],
        request=ClothCreateSerializer,
    ),
    list=extend_schema(
        summary="userId 기반 옷 리스트 출력",
        tags=["Cloth"],
    )
)
class ClothUserViewSet(mixins.ListModelMixin,
                       mixins.CreateModelMixin,
                       GenericViewSet):
    queryset = Cloth.objects.all()
    serializer_class = ClothSerializer
    pagination_class = ClothPagePagination
    permission_classes = [UserAccessPermission]

    def get_queryset(self):
        user = self.kwargs['userId']
        return Cloth.objects.filter(userId=user)

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'create':
            return ClothUserCreateSerializer
        if self.action == 'list':
            return ClothDetailSerializer
        return self.serializer_class

    def create(self, request, *args, **kwargs):
        request.data['userId'] = self.kwargs['userId']
        return super().create(request, *args, **kwargs)
