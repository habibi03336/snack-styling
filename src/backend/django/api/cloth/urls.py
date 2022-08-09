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
# urlpatterns = [
#     path('', views.ClothViewSet.as_view({
#         'get':'list',
#         'post': 'create',
#     })),
#     path('multi-update/', views.ClothUpdateAPIView.as_view({
#         'patch': 'update',
#     })),
#     path('<int:pk>/', views.ClothRetrieveViewSet.as_view({
#         'get':'retrieve',
#         'patch': 'update',
#         # 'delete': 'destroy',
#     })),
# path('user/<int:userId>/', views.ClothFilteredViewSet.as_view({
#     'get': 'list',
#     'post': 'create',
# }))
# ]
