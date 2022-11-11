from rest_framework import routers

from api.codiplan import views
from django.urls import include, path

router = routers.DefaultRouter()
router.register(r'', views.CodiPlanViewSet, basename='codiplan')

urlpatterns = [
    path('user/', views.CodiPlanUserViewSet.as_view({
        'get': 'list',
        'post': 'create',
        'patch': 'partial_update',
        'delete': 'destroy',
    })),
    path('', include(router.urls)),
]
