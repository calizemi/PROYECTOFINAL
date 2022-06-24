from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Shipping
from .serializers import ShippingSerializer


class ShippingView(APIView):
    
    permission_classes = [permissions.IsAuthenticated ]

    def get(self, request):

        shipping_options = Shipping.objects.order_by('price').all()
        shipping_options = ShippingSerializer(shipping_options, many=True)

        return Response(
                {'shipping': shipping_options.data},
                status=status.HTTP_200_OK
        )
