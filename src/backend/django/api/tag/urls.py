from django.urls import path
from api.tag import views

urlpatterns = [
    path('', views.TagViewSet.as_view({'get': 'list',})),
]
