from django.urls import path, include
from rest_framework import routers

from api.tag import views

router = routers.DefaultRouter()
router.register(r'', views.TagViewSet, basename="tag")

urlpatterns = [
    path('', include(router.urls)),
]
