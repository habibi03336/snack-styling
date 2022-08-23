from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import SpectacularJSONAPIView
from drf_spectacular.views import SpectacularSwaggerView

urlpatterns = [
    path('api/v1/', include('api.urls')),
    path('admin/', admin.site.urls),
    path("docs/json/", SpectacularJSONAPIView.as_view(), name="schema-json"),
    path('docs/swagger/', SpectacularSwaggerView.as_view(url_name='schema-json'), name="swagger-ui"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
