from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from .serializers import OrderSerializers


class OrderView(APIView):
    def get(self, request):
        req = Order.objects.all()
        setOrder = OrderSerializers(req, many=True)
        context = {
            'ok': True,
            'content': setOrder.data
        }
        return Response(context)

class ListOrdersView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            orders = Order.objects.order_by('-date_issued').filter(user=user)
            result = []

            for order in orders:
                item = {}
                item['status'] = order.status
                item['transaction_id'] = order.transaction_id
                item['precio_total'] = order.precio_total
                item['shipping_precio'] = order.shipping_precio
                item['fecha_proceso'] = order.fecha_proceso
                item['direccion'] = order.direccion

                result.append(item)

            return Response(
                {'orders': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving orders'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ListOrderDetailView(APIView):
    def get(self, request, transactionId, format=None):
        user = self.request.user

        try:
            if Order.objects.filter(user=user, transaction_id=transactionId).exists():
                order = Order.objects.get(
                    user=user, transaction_id=transactionId)
                result = {}
                result['status'] = order.status
                result['transaction_id'] = order.transaction_id
                result['precio_total'] = order.precio_total
                result['full_name'] = order.full_name
                result['direccion'] = order.direccion
                result['ciudad'] = order.ciudad
                result['distrito'] = order.distrito
                result['codigo_postal'] = order.codigo_postal
                result['telefono'] = order.telefono
                result['shipping_nombre'] = order.shipping_nombre
                result['shipping_tiempo'] = order.shipping_tiempo
                result['shipping_precio'] = order.shipping_precio
                result['fecha_proceso'] = order.fecha_proceso

                order_items = OrderItem.objects.order_by(
                    '-fecha_proceso').filter(order=order)
                result['order_items'] = []

                for order_item in order_items:
                    sub_item = {}

                    sub_item['nombre'] = order_item.nombre
                    sub_item['precio'] = order_item.precio
                    sub_item['cantidad'] = order_item.cantidad

                    result['order_items'].append(sub_item)
                return Response(
                    {'order': result},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'Order with this transaction ID does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving order detail'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
