from django.urls import path, include, re_path
from django.contrib import admin

from django.views.generic import TemplateView


from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),

    path('api/producto/', include('apps.producto.urls')),
    path('api/cliente/', include('apps.cliente.urls')),
    
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
