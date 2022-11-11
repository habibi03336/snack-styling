from django.db import models


class Tag(models.Model):        
    category_id = models.IntegerField()
    name = models.CharField(max_length=60)
    
    def __str__(self):
        return self.name
    
    class Meta:
        app_label = "tagmodel"
        pass