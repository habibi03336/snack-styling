from rest_framework import serializers

from model.tagmodel.models import Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'category_id']
