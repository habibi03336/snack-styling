from django.db import models


class ActiveManger(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(isdeleted=False)

class Cloth(models.Model):
    # user = models.ForeignKey('User', on_delete=models.SET_NULL, blank=True, null=True)
    userId = models.IntegerField('userId', default=1)
    image = models.ImageField('IMAGE', upload_to='cloth/%Y/%m/%d/')
    create_dt = models.DateTimeField('CREATE DT', auto_now_add=True)
    tags = models.ManyToManyField('tagmodel.Tag', blank=True)
    isdeleted = models.BooleanField(default=False)
    
    objects = ActiveManger()
    all_objects = models.Manager()
    class Meta:
        app_label = "clothmodel"
        ordering = ('create_dt',)
        