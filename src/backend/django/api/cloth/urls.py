from django.urls import path

from api.cloth import views


urlpatterns = [
    path('', views.ClothViewSet.as_view({
        'get':'list',
        'post': 'create',
    })),
    path('multi-update/', views.ClothUpdateAPIView.as_view({
        'patch': 'update',
    })),
    path('<int:pk>/', views.ClothRetrieveViewSet.as_view({
        'get':'retrieve',
        'patch': 'update',
        # 'delete': 'destroy',
    })),
]