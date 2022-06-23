from rest_framework import serializers
from .models import (Material, Funcion, Producto)

class MaterialSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Material
        fields = '__all__'

class FuncionSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Funcion
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Producto
        fields = '__all__'

class MaterialProductosSerializer(serializers.ModelSerializer):
    Productos = ProductoSerializer(many=True,read_only=True)
    class Meta:
        model = Material
        fields = ['material_id','nombre','Productos']
    