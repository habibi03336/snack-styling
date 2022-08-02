from django.core.files.uploadedfile import InMemoryUploadedFile

from rest_framework import serializers

from model.clothmodel.models import Cloth

from drf_spectacular.utils import extend_schema_field
from drf_spectacular.types import OpenApiTypes

from PIL import Image
from io import BytesIO
from rembg import remove


def removebg(raw_img):
    max_value = max(raw_img.width, raw_img.height)
    div = max_value // 1000
    if div == 0:
        div = 1
    img_resize = raw_img.resize(
        (int(raw_img.width/div), int(raw_img.height/div)))
    result_img = remove(img_resize)
    return result_img


class ClothSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cloth
        fields = ['id', 'image', 'create_dt', 'tags']


class ClothCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cloth
        fields = ['id', 'image']

    def create(self, validated_data):
        raw_img = validated_data['image']
        pil_img_obj = Image.open(validated_data['image']).convert('RGBA')
        new_img = removebg(pil_img_obj)
        print(type(new_img))

        new_img_io = BytesIO()
        new_img.save(new_img_io, format='PNG')
        print
        result = InMemoryUploadedFile(new_img_io, 'ImageField', raw_img.name,
                                      'image/png', new_img_io.getbuffer().nbytes, raw_img.charset)

        validated_data['image'] = result

        return super().create(validated_data)

class ClothUserCreateSerializer(ClothCreateSerializer):
    class Meta:
        model = Cloth
        fields = ['id', 'userId', 'image']

class ClothRetrieveUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cloth
        # fields = '__all__'
        exclude = ('id', 'create_dt',)


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


class ClothListSerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        # print(instance)
        # print(validated_data)
        cloth_mapping = {cloth.id: cloth for cloth in instance}
        data_mapping = {item['id']: item for item in validated_data}

        ret = []
        for cloth_id, data in data_mapping.items():
            cloth = cloth_mapping.get(cloth_id, None)
            if cloth is not None:
                ret.append(self.child.update(cloth, data))
        print('list', ret)
        return ret


class ClothTagSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    tags = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = Cloth
        fields = '__all__'
        list_serializer_class = ClothListSerializer

    def update(self, instance, validated_data):
        instance.tags.set(validated_data.get('tags', instance.tags))
        instance.save()
        return instance
