// import "bootstrap/dist/css/bootstrap.min.css";
import "./nosotros.css";
import Formulario from "../../components/Formulario";

import imgAbout from "../../assets/img_about.png";

import icnPhone from "../../assets/icn_phone.png";
import icnAdress from "../../assets/icn_adress.png";
import icnMail from "../../assets/icn_mail.png";

const Nosotros = () => {




  return (
    
  <div  class="nosotros-page ">
    
    <div class="banner-top mt-5 d-flex"> </div> 

    <div class="container mt-5 d-flex ">
    <div class="row">
    <div class="col-md-12">
    <nav aria-label="breadcrumb ">
    <ol class="breadcrumb col-md-12">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Nosotros</li>
    </ol>
    </nav>
    </div>
    

    <div class="container mt-5 d-flex ">
    <div class="row">
    
    <div class="col-md-8 post-content">
    <div class="blog-nota  mt-4 mb-5 pr-4">
       <h1 class="mt-3 mb-5">¿Quiénes somos?</h1>
         <h5 class="mt-3 mb-3">Nuestra idea siempre ha sido generar una plataforma que, además de vender juegos y juguetes que den el
          protagonismo a las niñas y los niños, sea un potente canal de difusión desde el que promover el juego infantil de calidad.</h5>
          <p class="mt-3 mb-3 "> Desde que nos embarcamos en esta aventura, nos hemos propuesto contínuamente la difícil tarea de mirar el mundo con ojos de niñas,
             para intentar respirarlo desde su piel. Nuestra misión no es tener la mejor empresa de juguetes del mundo, sino que lo que queremos es
              darle al juego el espacio que merece, devolvérselo a la infancia. Por eso venimos todos los días contentas a la oficina. Tenemos un 
              porqué.
              </p>
          
    </div>
    </div> 

    <div class="col-lg-4">
  <div class="info">
    <div class="address">
      <i class=" "></i>
      
      <h4> <img width="30"  src={icnAdress} alt="" /> Ubicación:</h4>
      <p>Av. Pardo y Aliaga 621, San Isidro 15073</p>
    </div>

    <div class="email">
      <i class=" "></i>
      <h4> <img width="30"  src={icnMail} alt="" /> Correo:</h4>
      <p>info@mundopeques.com</p>
    </div>

    <div class="phone">
      <i class=""></i>
      
      <h4> <img width="30"  src={icnPhone} alt="" /> Teléfono:</h4>
      <p>+51 966 257 365</p>
    </div>

  </div>

</div>


    </div>
    </div>



    <div class="col-md-12 mt-5 mt-lg-0">
    <h1 class="mt-3 mb-3">Contáctanos </h1>
<div class=" container cont-formulario col-lg-12 mt-4 mb-5 container-fluid"> 
<div class="row mt-5">
  <div class="col-lg-7 display: flex;">
  <p class="mt-3 mb-3 ">  Contacta con nosotros a través de info@mundopeques.com o a través de este formulario. Te responderemos de inmediato.  </p>
<Formulario nombre={Formulario} url={Formulario} /> </div>
<div  class=" img-form mb-5 col-md-5">
<img src={imgAbout} alt="image" class="img-fluid" /> </div>

</div>


</div>
</div> 
 
</div>


   
  </div>

  </div>

  );
};

export default Nosotros;