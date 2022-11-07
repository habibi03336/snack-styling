from drf_spectacular.utils import extend_schema_view
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet, ModelViewSet

import api.codiplan.schemas as CodiplanSchema
from api.codiplan.serializers import (CodiPlanRetrieveSerializer, CodiPlanUpdateDestroySerializer,
                                      CodiPlanSerializer)
from api.libs import isSelfRequest
from api.permissions import UserAccessPermission
from model.codiplanmodel.models import CodiPlan


@extend_schema_view(
    create=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    retrieve=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    partial_update=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    destroy=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    list=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    update_no_id=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    destroy_no_id=CodiplanSchema.CODIPLAN_SCHEMA_DELETE,
)
class CodiPlanViewSet(ModelViewSet):
    queryset = CodiPlan.objects.all()
    serializer_class = CodiPlanSerializer
    permission_classes = [UserAccessPermission]

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'update_no_id':
            return CodiPlanUpdateDestroySerializer
        if self.action == 'destroy_no_id':
            return CodiPlanUpdateDestroySerializer
        return self.serializer_class

    def find_by_userid_and_date(self, request):
        userId, plan_date = request.data['userId'], request.data['plan_date']
        return CodiPlan.objects.get(userId=userId, plan_date=plan_date).id

    @action(detail=False, methods=['patch'], url_path='update')
    def update_no_id(self, request, *args, **kwargs):
        self.kwargs['pk'] = self.find_by_userid_and_date(request)
        return super().partial_update(request, *args, **kwargs)

    @action(detail=False, methods=['delete'], url_path='delete')
    def destroy_no_id(self, request, *args, **kwargs):
        self.kwargs['pk'] = self.find_by_userid_and_date(request)
        return super().destroy(request, *args, **kwargs)


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
        pk = self.request.data['userId']
        queryset = CodiPlan.objects.filter(userId=pk)
        year = self.request.query_params.get('year', None)
        month = self.request.query_params.get('month', None)
        if year == None or month == None:
            return queryset

        return queryset.filter(plan_date__year=year, plan_date__month=month)

    def get_serializer_class(self):
        if hasattr(self, 'action') == False:
            return self.serializer_class

        if self.action == 'create':
            return CodiPlanSerializer
        if self.action == 'list':
            return CodiPlanRetrieveSerializer
        return self.serializer_class
