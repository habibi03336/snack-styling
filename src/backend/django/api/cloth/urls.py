from rest_framework import routers

from api.cloth import views
from django.urls import include, path

router = routers.DefaultRouter()
router.register(r'', views.ClothViewSet, basename="cloth")

urlpatterns = [
    path('user/', views.ClothUserViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })),
    path('', include(router.urls)),
]
