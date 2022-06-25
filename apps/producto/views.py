from multiprocessing import context
from rest_framework.views import APIView
from rest_framework.response import Response

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
        
        try:
            context = {
            'ok':True,
            'content':serProducto.data
            }
        except NameError:
            print(NameError)

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
    
# class ProductoView(APIView):
    
#     def get(self,request):
#         dataProducto=Producto.objects.all()
#         serProducto=ProductoSerializer(dataProducto,many=True)
        
#         context ={
#             'ok':True,
#             'data': serProducto.data
#         }
        
#         return Response(context)
    
# class ProductoDetailView(APIView):
#     def get(self,request,producto_id):
#         dataProductoDetail = Producto.objects.get(pk=property)
#         serProductoDetail =ProductoSerializer(dataProductoDetail)
        
#         context ={
#             'ok' : True,
#             'data': serProductoDetail.data
#         }
        
#         return Response(context)
