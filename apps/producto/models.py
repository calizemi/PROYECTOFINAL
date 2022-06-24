from django.db import models
from datetime import datetime
from cloudinary.models import CloudinaryField

    
class Material (models.Model):
    material_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length= 200)
    pubdate = models.DateField (auto_now_add= True)
    def __str__(self):
            return self.nombre

class Funcion (models.Model):
    
    nombre = models.CharField(max_length= 200)
    pubdate = models.DateField (auto_now_add= True)
    def __str__(self):
            return self.nombre

class Producto(models.Model):
    idproducto = models.AutoField(primary_key=True)  
    nombre = models.CharField(max_length=45)
    descripcion = models.CharField(max_length=45)
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cantidad = models.IntegerField(default=0)
    material = models.ForeignKey (Material,related_name='Productos',
                                    to_field='material_id',on_delete=models.RESTRICT,
                                    db_column='material_id',verbose_name='material')
    funcion = models.ForeignKey (Funcion, on_delete=models.RESTRICT)
    producto_img = CloudinaryField('image', default='')
    url = models.TextField()
    rango= models.CharField(max_length=50)
    dimension=models.CharField(max_length=50)
    fecha_creada=models.DateTimeField(default=datetime.now)
    
    def __str__(self):
            return self.nombre