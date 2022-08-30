from django.urls import path, include
from rest_framework import routers

from api.cloth import views

router = routers.DefaultRouter()
router.register(r'', views.ClothViewSet, basename="cloth")

urlpatterns = [
    path('', include(router.urls)),
    path('user/<int:userId>/', views.ClothUserViewSet.as_view({
        'get': 'list',
        'post': 'create',
    }))
]
