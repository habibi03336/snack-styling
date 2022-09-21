from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from drf_spectacular.utils import extend_schema_view

from api.codiplan.serializers import CodiPlanRetrieveSerializer, CodiPlanSerializer
from api.libs import isSelfRequest
from api.permissions import UserAccessPermission

from model.codiplanmodel.models import CodiPlan

import api.codiplan.schemas as CodiplanSchema


@extend_schema_view(
    create=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    retrieve=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    partial_update=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    destroy=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    list=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    dup_create=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
)
class CodiPlanViewSet(ModelViewSet):
    queryset = CodiPlan.objects.all()
    serializer_class = CodiPlanSerializer
    permission_classes = [UserAccessPermission]


@extend_schema_view(
    create=CodiplanSchema.CODIPLANUSER_SCHEMA_CREATE,
    list=CodiplanSchema.CODIPLANUSER_SCHEMA_LIST,
)
class CodiPlanUserViewSet(mixins.CreateModelMixin,
                          mixins.ListModelMixin,
                          GenericViewSet):
    serializer_class = CodiPlanSerializer
    permission_classes = [UserAccessPermission]

    def get_queryset(self):
        pk = isSelfRequest(self.request)
        return CodiPlan.objects.filter(userId=pk)

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'create':
            return CodiPlanSerializer
        if self.action == 'list':
            return CodiPlanRetrieveSerializer
        return self.serializer_class

    def create(self, request, *args, **kwargs):
        setattr(request.data, '_mutable', True)
        request.data['userId'] = isSelfRequest(request)
        return super().create(request, *args, **kwargs)
