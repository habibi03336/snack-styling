from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from api.codiplan.serializers import CodiPlanSerializer

from model.codiplanmodel.models import CodiPlan


class CodiPlanViewSet(ModelViewSet):
    queryset = CodiPlan.objects.all()
    serializer_class = CodiPlanSerializer
