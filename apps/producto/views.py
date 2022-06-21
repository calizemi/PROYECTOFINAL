from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Producto

from .serializer import ProductoSerializer

class ProductoView(APIView):
    
    def get(self,request):
        dataProducto=Producto.objects.all()
        serProducto=ProductoSerializer(dataProducto,many=True)
        
        context ={
            'ok':True,
            'data': serProducto.data
        }
        
        return Response(context)
    
class ProductoDetailView(APIView):
    def get(self,request,producto_id):
        dataProductoDetail = Producto.objects.get(pk=property)
        serProductoDetail =ProductoSerializer(dataProductoDetail)
        
        context ={
            'ok' : True,
            'data': serProductoDetail.data
        }
        
        return Response(context)
