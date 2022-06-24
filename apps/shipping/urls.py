
from django.urls import path
from .views import ShippingView

urlpatterns = [
    path('shipping', ShippingView.as_view()),
]