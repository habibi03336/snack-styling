from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from api.cloth.libs import removeBackground
from api.exceptions import AlreadyTerminated
from model.clothmodel.models import Cloth


class ClothSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cloth
        fields = ['id', 'userId', 'image', 'create_dt', 'tags']


class ClothCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cloth
        fields = ['id', 'image']

    def create(self, validated_data):
        result = removeBackground(validated_data['image'])
        validated_data['image'] = result
        return super().create(validated_data)


class ClothUserCreateSerializer(ClothCreateSerializer):
    class Meta:
        model = Cloth
        fields = ['id', 'userId', 'image']


class ClothRetrieveUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cloth
        fields = ['tags']


class ClothDetailSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    tags = serializers.StringRelatedField(many=True)

    class Meta:
        model = Cloth
        fields = ['id', 'category', 'image', 'create_dt', 'tags']

    @extend_schema_field(OpenApiTypes.STR)
    def get_category(self, obj):
        category = obj.tags.filter(category_id=100)
        if category.exists():
            return category[0].name
        return "없음"

class ClothDestroySerializer(serializers.Serializer):
    
    def update(self, instance, validated_data):
        if instance.isdeleted == True:
            raise AlreadyTerminated
        instance.isdeleted = True
        instance.save()
        return instance
        

class ClothListSerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        data_mapping = {item['id']: item for item in validated_data}
        for one in instance:
            self.child.update(one, data_mapping[one.id])

        return instance

    def get_id_list(self):
        result = {item['id'] for item in self.validated_data}
        return result


class ClothTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cloth
        fields = ['id', 'tags']
        extra_kwargs = {'id': {'read_only': False}}
        list_serializer_class = ClothListSerializer

    def update(self, instance, validated_data):
        instance.tags.set(validated_data.get('tags', instance.tags))
        return instance
