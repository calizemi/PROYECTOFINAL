from django.contrib import admin

from .models import Producto, Material, Funcion
admin.site.register(Producto)
admin.site.register(Material)
admin.site.register(Funcion)
