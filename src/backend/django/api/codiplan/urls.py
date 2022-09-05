from django.urls import path, include
from rest_framework import routers

from api.codiplan import views

router = routers.DefaultRouter()
router.register(r'', views.CodiPlanViewSet, basename='codiplan')

urlpatterns = [
    path('', include(router.urls)),
]
