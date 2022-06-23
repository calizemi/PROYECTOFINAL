from django.urls import path

from .views import MaterialView,FuncionView,ProductoView,MaterialProductosView

app_name="producto"
urlpatterns=[
    path('material', MaterialView.as_view()),
    path('funcion', FuncionView.as_view()),
    path('producto', ProductoView.as_view()),
    path('material/<int:material_id>/productos', MaterialProductosView.as_view()),
]