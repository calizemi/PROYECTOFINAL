from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Cliente
from .serializers import ClienteSerializer


class GetClienteView(APIView):
    def get(self, request):
        
        user = self.request.user
        cliente = Cliente.objects.get(user=user)
        cliente = ClienteSerializer(cliente)

        return Response(
            {'perfil': cliente.data},
             status=status.HTTP_200_OK
        )
       


class UpdateClienteView(APIView):
    def put(self, request):

        user = self.request.user
        data = self.request.data

        direccion = data['direccion']
        telefono = data['telefono']
           

        Cliente.objects.filter(user=user).update(
            direccion=direccion,
            telefono=telefono
        )

        cliente = Cliente.objects.get(user=user)
        cliente = ClienteSerializer(cliente)

        return Response(
            {'perfil': cliente.data},
            status=status.HTTP_200_OK
            )
       