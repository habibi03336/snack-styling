from collections import OrderedDict

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field, extend_schema_serializer
from rest_framework import serializers

from api.codi.libs import isNoneCloth
from api.exceptions import AlreadyAdopted
from model.codimodel.models import Codi


class CodiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codi
        fields = ['id', 'top', 'bottom', 'cap',
                  'footwear', 'bag', 'outer', 'comments']


class CodiUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codi
        fields = ['id', 'userId', 'top', 'bottom',
                  'cap', 'footwear', 'bag', 'outer', 'comments']


class CodiCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codi
        fields = ['id', 'top', 'bottom', 'cap',
                  'footwear', 'bag', 'outer', 'comments']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        ret = OrderedDict()
        ret['id'] = data['id']
        return ret


class CodiUserCreateSerializer(CodiCreateSerializer):
    class Meta:
        model = Codi
        fields = ['id', 'userId', 'top', 'bottom',
                  'cap', 'footwear', 'bag', 'outer', 'comments']


class CodiDetailSerializer(serializers.ModelSerializer):
    top = serializers.SerializerMethodField()
    bottom = serializers.SerializerMethodField()
    cap = serializers.SerializerMethodField()
    footwear = serializers.SerializerMethodField()
    bag = serializers.SerializerMethodField()
    outer = serializers.SerializerMethodField()

    class Meta:
        model = Codi
        fields = ['id', 'top', 'bottom', 'cap',
                  'footwear', 'bag', 'outer', 'comments']

    @extend_schema_field(OpenApiTypes.STR)
    def get_top(self, obj):
        return isNoneCloth(obj.top)

    @extend_schema_field(OpenApiTypes.STR)
    def get_bottom(self, obj):
        return isNoneCloth(obj.bottom)

    @extend_schema_field(OpenApiTypes.STR)
    def get_cap(self, obj):
        return isNoneCloth(obj.cap)

    @extend_schema_field(OpenApiTypes.STR)
    def get_footwear(self, obj):
        return isNoneCloth(obj.footwear)

    @extend_schema_field(OpenApiTypes.STR)
    def get_bag(self, obj):
        return isNoneCloth(obj.bag)

    @extend_schema_field(OpenApiTypes.STR)
    def get_outer(self, obj):
        return isNoneCloth(obj.outer)


class CodiUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codi
        fields = ['id', 'top', 'bottom', 'cap', 'footwear', 'bag', 'outer', 'comments']

    def update(self, instance, validated_data):
        if instance.islock == True:
            raise AlreadyAdopted
        return super().update(instance, validated_data)


@extend_schema_serializer(exclude_fields=('id', 'userId',))
class CodiDuplicateSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    userId = serializers.IntegerField()

    def create(self, validated_data):
        instance = Codi.objects.get(pk=validated_data['id'])
        instance.pk = None
        instance.userId = validated_data['userId']
        instance.islock = False
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.islock = True
        instance.save()
        return instance
