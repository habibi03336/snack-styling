from django.db import models

def isNoneCloth(obj: models.Model):
        if obj == None:
            return None
        if obj.isdeleted == True:
            return None
        return obj.image.url