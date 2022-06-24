from django.db import models


class Shipping(models.Model):

    nombre = models.CharField(max_length=255, unique=True)
    tiempo_de_entrega = models.CharField(max_length=255)
    precio = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.nombre