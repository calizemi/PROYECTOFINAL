from django.urls import path
from .views import ListOrdersView, ListOrderDetailView

urlpatterns = [
    path('order', ListOrdersView.as_view()),
    path('order/<transactionId>', ListOrderDetailView.as_view()),
]