from rest_framework import serializers

from model.codiplanmodel.models import CodiPlan


class CodiPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodiPlan
        fields = ['userId', 'codi', 'plan_date']


class CodiPlanRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodiPlan
        fields = ['codi', 'plan_date']
        ordering = ['plan_date', 'pk']
