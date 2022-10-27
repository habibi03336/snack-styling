from rest_framework import routers

from api.codi import views
from django.urls import include, path

router = routers.DefaultRouter()
router.register(r'', views.CodiViewSet, basename="codi")

urlpatterns = [
    path('user/', views.CodiUserViewSet.as_view({
        'get':'list',
        'post':'create',
    })),
    path('',  include(router.urls)),
]