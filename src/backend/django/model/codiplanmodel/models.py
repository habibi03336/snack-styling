from django.db import models

class CodiPlan(models.Model):    
    userId = models.IntegerField('userId', default=1)
    codi = models.ForeignKey('codimodel.Codi', on_delete=models.CASCADE)
    plan_date = models.DateField('date')
    
    class Meta:
        ordering = ('plan_date', 'id')