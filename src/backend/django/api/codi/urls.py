from django.urls import path, include
from rest_framework import routers

from api.codi import views

router = routers.DefaultRouter()
router.register(r'', views.CodiViewSet, basename="codi")

urlpatterns = [
    path('',  include(router.urls)),
    path('user/', views.CodiUserViewSet.as_view({
        'get':'list',
        'post':'create',
    }))
]