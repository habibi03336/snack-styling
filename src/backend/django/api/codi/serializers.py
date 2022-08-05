from collections import OrderedDict
from rest_framework import serializers

from model.codimodel.models import Codi

class CodiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codi
        fields = '__all__'
        
class CodiCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codi
        exclude = ('userId',)
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        ret = OrderedDict()
        ret['id'] = data['id']
        return ret

class CodiUserCreateSerializer(CodiCreateSerializer):
    class Meta:
        model = Codi
        fields = ['id', 'userId', 'top', 'bottom']

class CodiListSerializer(serializers.ModelSerializer):
    top = serializers.ImageField(source='top.image')
    bottom = serializers.ImageField(source='bottom.image')
    
    class Meta:
        model = Codi
        fields = ['id', 'top', 'bottom']
        