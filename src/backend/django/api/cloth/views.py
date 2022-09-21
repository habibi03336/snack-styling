from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from drf_spectacular.utils import extend_schema_view
from api.libs import getUserIdFromJWT, isSelfRequest

from api.cloth.paginations import ClothPagePagination
from api.cloth.serializers import ClothDestroySerializer, ClothSerializer, ClothDetailSerializer, ClothCreateSerializer, ClothUserCreateSerializer, ClothRetrieveUpdateSerializer, ClothTagSerializer
from api.permissions import UserAccessPermission

from model.clothmodel.models import Cloth

import api.cloth.schemas as ClothSchema


@extend_schema_view(
    create=ClothSchema.CLOTH_SCHEMA_CREATE,
    retrieve=ClothSchema.CLOTH_SCHEMA_RETRIEVE,
    partial_update=ClothSchema.CLOTH_SCHEMA_PARTIAL_UPDATE,
    list=ClothSchema.CLOTH_SCHEMA_LIST,
    destroy=ClothSchema.CLOTH_SCHEMA_DESTROY,
    multiple_tag_update=ClothSchema.CLOTH_SCHEMA_MULTI_UPDATE,
)
class ClothViewSet(ModelViewSet):
    queryset = Cloth.objects.all()
    pagination_class = ClothPagePagination
    permission_classes = [UserAccessPermission]

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
            return ClothDestroySerializer
        if self.action == 'list':
            return ClothDetailSerializer
        if self.action == 'multiple_tag_update':
            return ClothTagSerializer
        return ClothSerializer

    def destroy(self, request, *args, **kwargs):
        pk = getUserIdFromJWT(request)
        request.data['id'] = pk
        return super().update(request, *args, **kwargs)

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
    create=ClothSchema.CLOTHUSER_SCHEMA_CREATE,
    list=ClothSchema.CLOTHUSER_SCHEMA_LIST,
)
class ClothUserViewSet(mixins.ListModelMixin,
                       mixins.CreateModelMixin,
                       GenericViewSet):
    queryset = Cloth.objects.all()
    serializer_class = ClothSerializer
    pagination_class = ClothPagePagination
    permission_classes = [UserAccessPermission]

    def get_queryset(self):
        # user = self.kwargs['userId']
        pk = isSelfRequest(self.request)
        return Cloth.objects.filter(userId=pk)

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'create':
            return ClothUserCreateSerializer
        if self.action == 'list':
            return ClothDetailSerializer
        return self.serializer_class

    def create(self, request, *args, **kwargs):
        request.data['userId'] = isSelfRequest(request)
        return super().create(request, *args, **kwargs)
