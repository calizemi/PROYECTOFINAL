from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.orders.models import Order, OrderItem
from apps.producto.models import Producto
from apps.shipping.models import Shipping
from django.core.mail import send_mail
import braintree

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        environment=settings.BT_ENVIRONMENT,
        merchant_id=settings.BT_MERCHANT_ID,
        public_key=settings.BT_PUBLIC_KEY,
        private_key=settings.BT_PRIVATE_KEY
    )
)

class GenerateTokenView(APIView):
    def get(self, request, format=None):
        try:
            token = gateway.client_token.generate()

            return Response(
                {'braintree_token': token},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving braintree token'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



class ProcessPaymentView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data
        cartItems=self.request.cart

        nonce = data['nonce']
        shipping_id = str(data['shipping_id'])
        full_name = data['full_name']
        precio_total = data['precio_total']
        direccion = data['direccion']
        ciudad = data['ciudad']
        distrito = data['distrito']
        codigo_postal = data['codigo_postal']
        telefono = data['telefono']
        cart_items = cartItems

        
        shipping = Shipping.objects.get(id=int(shipping_id))

        shipping_nombre = shipping.nombre
        shipping_tiempo = shipping.tiempo_de_entrega
        shipping_precio = shipping.precio

        
        cart_items = data['cart']

        try:
            # Crear transaccion con braintree
            newTransaction = gateway.transaction.sale(
                {
                    'amount': str(precio_total),
                    'payment_method_nonce': str(nonce['nonce']),
                    'options': {
                        'submit_for_settlement': True
                    }
                }
            )
        except:
            return Response(
                {'error': 'Error processing the transaction'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        if newTransaction.is_success or newTransaction.transaction:
            for cart_item in cart_items:
                update_producto = Producto.objects.get(idproducto=cart_item.id)
                
                cantidad = int(update_producto.cantidad) - int(cart_item.quantity)

                #actualizar el producto
                Producto.objects.filter(idproducto=cart_item.id).update(
                    cantidad=cantidad
                )
            
            #crear orden
            try:
                order = Order.objects.create(
                    user=user,
                    transaction_id=newTransaction.transaction.id,
                    precio_total=precio_total,
                    full_name=full_name,
                    direccion=direccion,
                    ciudad=ciudad,
                    distrito=distrito,
                    codigo_postal=codigo_postal,
                    telefono=telefono,
                    shipping_nombre=shipping_nombre,
                    shipping_tiempo=shipping_tiempo,
                    shipping_precio=float(shipping_precio)
                )
            except:
                return Response(
                    {'error': 'Transaction succeeded but failed to create the order'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            for cart_item in cart_items:
                try:
                    # agarrar el producto
                    producto = Producto.objects.get(idproducto=cart_item.id)

                    OrderItem.objects.create(
                        producto=producto,
                        order=order,
                        nombre=producto.name,
                        precio=cart_item.precio,
                        quantity=cart_item.quantity
                    )
                except:
                    return Response(
                        {'error': 'Transaction succeeded and order created, but failed to create an order item'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

            try:
                send_mail(
                    'Detalles del pedido',
                    'Hola ' + full_name + ','
                    + '\n\nTu pedido ha sido recibido con exito!'
                    + '\n\nPronto estaremos procesando tu pedido.'
                    + '\n\nPuedes visualizar el estado de tu orden ingresando con tu usuario.'
                    + '\n\nSaludos,'
                    + '\nEcommerce-Montessori',
                    'proyecto.codigo13@gmail.com',
                    [user.email],
                    fail_silently=False
                )
            except:
                return Response(
                    {'error': 'Transaction succeeded and order created, but failed to send email'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            return Response(
                {'success': 'Transaction successful and order was created'},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'Transaction failed'},
                status=status.HTTP_400_BAD_REQUEST
            )