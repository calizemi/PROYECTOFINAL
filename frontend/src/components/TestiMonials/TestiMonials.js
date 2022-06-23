import React, { useEffect, useState } from 'react';
import TestiMonialsDetails from '../TestiMonialsDetails/TestiMonialsDetails'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import userPic from '../../assets/image/toy.jpg';
import './TestiMonials.css'

const TestiMonials = () => {
  
    const testiMonials = [
        {
            name: 'Aprendizaje',
            description: 'El Método Montessori se basa en el aprendizaje autónomo, libre, práctico y por descubrimiento.',

            img: 'https://w7.pngwing.com/pngs/313/790/png-transparent-educational-toys-child-toy-block-montessori-child-toy-block-infant.png'
        },
        {
            name: 'Entorno educativo',
            description: 'El entorno educativo tiene que ser seguro y cómodo para los niños para que puedan desarrollar de manera activa y libre las actividades que elijan.',
           
            img: 'https://www.etapainfantil.com/wp-content/plugins/aawp/public/image.php?url=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFZb1E4VGtZU0wuanBn'
        },
        {
            name: 'Iniciativa de los niños',
            description: 'Ellos marcan su propio aprendizaje sin presiones ni obligaciones. De esta manera, se está dando la oportunidad de que los niños expresen sus preferencias educativas.',
          
            img: 'https://www.compramejor.es/wp-content/uploads/2020/12/motor-loop-gc35945842_1920-1200x800.jpg'
        },
        {
            name: 'De maestros a guías',
            description: 'Los docentes tienen el rol principal dentro del proceso aprendizaje-enseñanza, y aquí se transforman en guías que observan a los niños.',
            
            img: 'https://static3.elcorreo.com/www/multimedia/201712/12/media/cortadas/jugueters-educativos-navidad-no-veras-television%20(8)-k8iH-U50345481522DJD-624x450@El%20Correo.jpg'
        },
    ]
    //Owl Carousel Settings
    const options = {
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    };
    return (
        <section id="testimonial" className="testimonials pt-70 pb-70">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                            {
                                testiMonials.length === 0 ?
                                    <div className="item">
                                        <div className="shadow-effect">
                                            <img className="img-circle" src={userPic} />

                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                                        </div>
                                        <div className="testimonial-name">
                                            <h5>Rajon Rony</h5>
                                            <small>ITALY</small>
                                        </div>
                                    </div> :
                                    testiMonials.map(testiMonialDetail => {
                                        return (
                                            <TestiMonialsDetails testiMonialDetail={testiMonialDetail} key={testiMonialDetail._key} />

                                        )
                                    })
                            }
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestiMonials;