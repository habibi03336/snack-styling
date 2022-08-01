from django.db import models
        
class Codi(models.Model):
    top = models.ForeignKey('clothmodel.Cloth', on_delete=models.SET_NULL, blank=True, null=True, related_name='top_cloth_req')
    bottom = models.ForeignKey('clothmodel.Cloth', on_delete=models.SET_NULL, blank=True, null=True, related_name='bottom_cloth_req')