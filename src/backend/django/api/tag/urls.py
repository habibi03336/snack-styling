from rest_framework import routers

from api.tag import views
from django.urls import include, path

router = routers.DefaultRouter()
router.register(r'', views.TagViewSet, basename="tag")

urlpatterns = [
    path('', include(router.urls)),
]
