import React from "react";
import TestiMonials from "../../components/TestiMonials/TestiMonials";
import "./home.css";
import kid from "../../assets/image/img-kid.png"

const Home = () => {
  return (
    <div className="sec-home">
      <div className="container-home">
        <div className="content-home">
          <div className="content-first">

          <h3>PARA UN MEJOR FUTURO</h3>
            <h2>
            METODOLOGÍA MONTESSORI
            </h2>
            
            <p>
            La metodología Montessori involucra un desarrollo integral psicomotriz del niño, potenciando sus habilidades blandas desde temprana edad, a fin de obtener un óptimo nivel en su  futuro desempeño escolar
            </p>
          </div>

          <div>
              <img className="img-kid" src={kid} style={{width:"500px"}} />
          </div>
        </div>
        <div className="carousel">
          <TestiMonials />
        </div>
      </div>
    </div>
  );
};

export default Home;
