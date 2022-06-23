// import "bootstrap/dist/css/bootstrap.min.css";
import "./formulario.css";





const Formulario = () =>{


    return(


  
 
    <form id="registro" role="form" class="email-form">
<div class="row">
  <div class="col-md-6 form-group">
    <input type="text" name="nombre" class="form-control" id="name" placeholder="Nombre" required/>
  </div>
  <div class="col-md-6 form-group mt-3 mt-md-0">
    <input type="email" class="form-control" name="email" id="email" placeholder="Correo" required/>
  </div>
</div>
<div class="form-group mt-3">
  <input type="text" class="form-control" name="asunto" id="subject" placeholder="Asunto" required/>
</div>
<div class="form-group mt-3">
  <textarea class="form-control" name="mensaje" rows="5"  id="mensaje" placeholder="Mensaje" required></textarea>
</div>
<br/>
<br/>
<div class="text-center" ><button class="button-submit" id="btn-enviar" type="submit">Enviar mensaje</button></div>
</form>







    )
    

}

export default Formulario;
