from django.urls import path

from .views import ProductoDetailView,MaterialView,FuncionView,ProductoView,MaterialProductosView

app_name="producto"
urlpatterns=[
    path('producto/<producto_id>', ProductoDetailView.as_view()),
    path('material', MaterialView.as_view()),
    path('funcion', FuncionView.as_view()),
    path('producto', ProductoView.as_view()),
    path('material/<int:material_id>/productos', MaterialProductosView.as_view()),
]