from django.db import models
from django.db import IntegrityError

from model.exceptions import DuplicateCodiplanException

class CodiPlan(models.Model):    
    userId = models.IntegerField('userId', default=1)
    codi = models.ForeignKey('codimodel.Codi', on_delete=models.CASCADE)
    plan_date = models.DateField('date')
    
    class Meta:
        ordering = ('plan_date', 'id')
        constraints = [
            models.UniqueConstraint(
                fields=['userId', 'plan_date'],
                name = 'unique codiplan for each days',
            )
        ]
        
    def save(self, *args, **kwargs):
        try:
            return super().save(*args, **kwargs)
        except IntegrityError:
            raise DuplicateCodiplanException