from django.urls import path

from api.codi import views


urlpatterns = [
    path('', views.CodiViewSet.as_view({
        'get':'list',
        'post':'create',
    })),
    path('<int:pk>/', views.CodiRetrieveViewSet.as_view({
        'get': 'retrieve',
    })),
    path('user/<int:userId>/', views.CodiUserViewSet.as_view({
        'get':'list',
        'post':'create',
    }))
]