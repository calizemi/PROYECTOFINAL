from django.db import models

from django.conf import settings
User = settings.AUTH_USER_MODEL

class Cliente(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) 
    direccion = models.CharField(max_length=45)
    telefono = models.CharField(max_length=45)

    def __str__(self):
            return self.user.email