from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .models import Material, Funcion, Producto
from .serializers import MaterialSerializer,FuncionSerializer, ProductoSerializer, MaterialProductosSerializer

from .models import Producto

from .serializers import ProductoSerializer


    
class MaterialView(APIView):
    def get (self,request):
        dataMaterial = Material.objects.all()
        serMaterial = MaterialSerializer(dataMaterial,many=True)
        context = {
            'ok':True,
            'content':serMaterial.data
        }

        return Response(context)


class FuncionView(APIView):
    def get (self,request):
        dataFuncion = Funcion.objects.all()
        serFuncion = FuncionSerializer(dataFuncion,many=True)
        context = {
            'ok':True,
            'content':serFuncion.data
        }

        return Response(context)

class ProductoView(APIView):
    def get (self,request):
        dataProducto = Producto.objects.all()
        serProducto = ProductoSerializer(dataProducto,many=True)
        context = {
            'ok':True,
            'content':serProducto.data
        }

        return Response(context)

class MaterialProductosView(APIView):
    def get (self,request,material_id):
        dataMaterial = Material.objects.get(pk=material_id)
        serMaterialProductos = MaterialProductosSerializer(dataMaterial)
        context = {
            'ok':True,
            'content':serMaterialProductos.data
        }

        return Response(context)

    
class ProductoDetailView(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self,request,producto_id):
       
            producto = Producto.objects.get(idproducto=producto_id)
            producto = ProductoSerializer(producto)
            
            context ={
                  'ok':True,
                  'content': producto.data
             }
        
            return Response(context) 
        
       
