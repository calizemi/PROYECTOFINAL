from django.urls import path
from .views import ListOrdersView, ListOrderDetailView,OrderView

urlpatterns = [
    path('or',OrderView.as_view()),
    path('order', ListOrdersView.as_view()),
    path('order/<transactionId>', ListOrderDetailView.as_view()),
]