from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema_view
from rest_framework.viewsets import ModelViewSet

import api.codiplan.schemas as CodiplanSchema
from api.codiplan.serializers import (CodiPlanRetrieveSerializer,
                                      CodiPlanSerializer)
from api.permissions import UserAccessPermission
from model.codiplanmodel.models import CodiPlan


@extend_schema_view(
    create=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    retrieve=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    partial_update=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    destroy=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
    list=CodiplanSchema.CODIPLAN_SCHEMA_DEFAULT,
)
class CodiPlanViewSet(ModelViewSet):
    queryset = CodiPlan.objects.all()
    serializer_class = CodiPlanSerializer
    permission_classes = [UserAccessPermission]


@extend_schema_view(
    create=CodiplanSchema.CODIPLANUSER_SCHEMA_CREATE,
    list=CodiplanSchema.CODIPLANUSER_SCHEMA_LIST,
    partial_update=CodiplanSchema.CODIPLANUSER_SCHEMA_UPDATE,
    destroy=CodiplanSchema.CODIPLANUSER_SCHEMA_DELETE,
)
class CodiPlanUserViewSet(ModelViewSet):
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
        if self.action == 'partial_update':
            return CodiPlanSerializer
        if self.action == 'destroy':
            return CodiPlanSerializer
        return self.serializer_class

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup_url_kwarg = ('userId', 'plan_date')
        values = (self.request.data[kwarg] for kwarg in lookup_url_kwarg)

        filter_kwargs = dict(zip(lookup_url_kwarg, values))
        obj = get_object_or_404(queryset, **filter_kwargs)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj
