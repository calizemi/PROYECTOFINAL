from django.urls import path
from .views import GenerateTokenView, ProcessPaymentView

app_name="payment"

urlpatterns = [
    path('get-token', GenerateTokenView.as_view()),
    path('make-payment', ProcessPaymentView.as_view()),
]