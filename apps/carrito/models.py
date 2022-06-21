from django.db import models
from django.conf import settings
from apps.producto.models import Producto

User = settings.AUTH_USER_MODEL


class Carrito(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    total_items = models.IntegerField(default=0)
    
class CarritoItem(models.Model):
    carrito = models.ForeignKey(Carrito,on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto,on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=0)
    
