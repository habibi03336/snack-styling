from django.urls import include, path

urlpatterns = [
    path('cloth/', include('api.cloth.urls')),
    path('tag/', include('api.tag.urls')),
    path('codi/', include('api.codi.urls')),
]
