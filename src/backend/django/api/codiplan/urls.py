from django.urls import path, include
from rest_framework import routers

from api.codiplan import views

router = routers.DefaultRouter()
router.register(r'', views.CodiPlanViewSet, basename='codiplan')

urlpatterns = [
    path('user/', views.CodiPlanUserViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })),
    path('', include(router.urls)),
]
