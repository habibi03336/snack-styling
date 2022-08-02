from django.db import models

class Cloth(models.Model):
    # user = models.ForeignKey('User', on_delete=models.SET_NULL, blank=True, null=True)
    userId = models.IntegerField('userId', default=1)
    image = models.ImageField('IMAGE', upload_to='cloth/%Y/%m/%d/')
    tags = models.ManyToManyField('tagmodel.Tag', blank=True)
    create_dt = models.DateTimeField('CREATE DT', auto_now_add=True)
    
    class Meta:
        app_label = "clothmodel"
        ordering = ('create_dt',)
        