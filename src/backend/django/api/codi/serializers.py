from collections import OrderedDict
from rest_framework import serializers

from model.codimodel.models import Codi

from api.codi.libs import isNoneCloth


class CodiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codi
        fields = ['id', 'top', 'bottom', 'cap', 'footwear']


class CodiUserSerializer(serializers.ModelSerializer):
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
    top = serializers.SerializerMethodField()
    bottom = serializers.SerializerMethodField()
    cap = serializers.SerializerMethodField()
    footwear = serializers.SerializerMethodField()

    class Meta:
        model = Codi
        fields = ['id', 'top', 'bottom', 'cap', 'footwear']

    def get_top(self, obj):
        return isNoneCloth(obj.top)

    def get_bottom(self, obj):
        return isNoneCloth(obj.bottom)

    def get_cap(self, obj):
        return isNoneCloth(obj.cap)

    def get_footwear(self, obj):
        return isNoneCloth(obj.footwear)


class CodiDuplicateSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    userId = serializers.IntegerField()

    def create(self, validated_data):
        instance = Codi.objects.get(pk=validated_data['id'])

        instance.pk = None
        instance.userId = validated_data['userId']

        instance.save()
        return instance
