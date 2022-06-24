from django.db import models
from apps.producto.models import Producto
from datetime import datetime
from django.contrib.auth import get_user_model
User = get_user_model()


class Order(models.Model):
    class OrderStatus(models.TextChoices):
        not_processed = 'not_processed'
        processed = 'processed'
        shipping = 'shipped'
        delivered = 'delivered'
        cancelled = 'cancelled'
    
    status = models.CharField(
        max_length=50, choices=OrderStatus.choices, default=OrderStatus.not_processed)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    transaction_id = models.CharField(max_length=255, unique=True)
    precio_total = models.DecimalField(max_digits=5, decimal_places=2)
    full_name = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    ciudad = models.CharField(max_length=100)
    distrito = models.CharField(max_length=100)
    codigo_postal = models.CharField(max_length=20)
    telefono = models.CharField(max_length=255)
    shipping_nombre = models.CharField(max_length=255)
    shipping_tiempo = models.CharField(max_length=255)
    shipping_precio = models.DecimalField(max_digits=5, decimal_places=2)
    fecha_proceso = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.transaction_id
    
class OrderItem(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.DO_NOTHING)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    precio = models.DecimalField(max_digits=5, decimal_places=2)
    cantidad = models.IntegerField()
    fecha_agregado = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.name
