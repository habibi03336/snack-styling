from collections import OrderedDict
from rest_framework import serializers

from model.codimodel.models import Codi


class CodiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codi
        fields = ['id', 'userId', 'top', 'bottom', 'cap', 'footwear']


class CodiCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codi
        fields = ['id', 'top', 'bottom', 'cap', 'footwear']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        ret = OrderedDict()
        ret['id'] = data['id']
        return ret


class CodiUserCreateSerializer(CodiCreateSerializer):
    class Meta:
        model = Codi
        fields = ['id', 'userId', 'top', 'bottom', 'cap', 'footwear']


class CodiListSerializer(serializers.ModelSerializer):
    top = serializers.ImageField(source='top.image', allow_null=True)
    bottom = serializers.ImageField(source='bottom.image', allow_null=True)
    cap = serializers.ImageField(source='cap.image', allow_null=True)
    footwear = serializers.ImageField(source='footwear.image', allow_null=True)

    class Meta:
        model = Codi
        fields = ['id', 'top', 'bottom', 'cap', 'footwear']
