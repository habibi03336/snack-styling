from django.db import models

class Codi(models.Model):
    userId = models.IntegerField('userId', default=1)
    top = models.ForeignKey('clothmodel.Cloth', on_delete=models.SET_NULL, null=True, related_name='top_cloth_req')
    bottom = models.ForeignKey('clothmodel.Cloth', on_delete=models.SET_NULL, null=True, related_name='bottom_cloth_req')
    cap = models.ForeignKey('clothmodel.Cloth', on_delete=models.SET_NULL, null=True, related_name='cap_cloth_req')
    footwear = models.ForeignKey('clothmodel.Cloth', on_delete=models.SET_NULL, null=True, related_name='footwear_cloth_req')
    bag = models.ForeignKey('clothmodel.Cloth', on_delete=models.SET_NULL, null=True, related_name='bag_cloth_req')
    outer = models.ForeignKey('clothmodel.Cloth', on_delete=models.SET_NULL, null=True, related_name='outer_cloth_req')
    comments = models.CharField(max_length=200, default="", blank=True)
    islock = models.BooleanField(default=False)
    
    class Meta:
        app_label = "codimodel"
        ordering = ('id',)