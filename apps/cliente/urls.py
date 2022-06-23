from os import lseek
from django.urls import path
from .views import GetClienteView, UpdateClienteView

urlpatterns = [
    path('user', GetClienteView.as_view()),
    path('update', UpdateClienteView.as_view()),
]