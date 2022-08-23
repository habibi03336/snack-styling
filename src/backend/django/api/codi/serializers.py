from collections import OrderedDict
from rest_framework import serializers

from model.codimodel.models import Codi
from rest_framework.relations import Hyperlink, PKOnlyObject  # NOQA # isort:skip

class CodiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codi
        fields = '__all__'
        
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
    top = serializers.ImageField(source='top.image')
    bottom = serializers.ImageField(source='bottom.image')
    cap = serializers.ImageField(source='cap.image')
    footwear = serializers.ImageField(source='footwear.image')
    
    class Meta:
        model = Codi
        fields = ['id', 'top', 'bottom', 'cap', 'footwear']
        
    def to_representation(self, instance):
        ret = OrderedDict()
        fields = self._readable_fields

        for field in fields:
            print(field)
            try:
                attribute = field.get_attribute(instance)
            except AttributeError:
                ret[field.field_name] = None
                continue

            # We skip `to_representation` for `None` values so that fields do
            # not have to explicitly deal with that case.
            #
            # For related fields with `use_pk_only_optimization` we need to
            # resolve the pk value.
            check_for_none = attribute.pk if isinstance(attribute, PKOnlyObject) else attribute
            if check_for_none is None:
                ret[field.field_name] = None
            else:
                ret[field.field_name] = field.to_representation(attribute)

        return ret
    