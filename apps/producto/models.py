from django.db import models
from datetime import datetime

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=6,decimal_places=2,default=0)
    cantidad = models.IntegerField(default=0)
    url=models.TextField()
    rango= models.CharField(max_length=50)
    dimension=models.CharField(max_length=50)
    funcion=models.CharField(max_length=50)
    fecha_creada=models.DateTimeField(default=datetime.now)
    
    def __str__(self) :
        return self.name
    
