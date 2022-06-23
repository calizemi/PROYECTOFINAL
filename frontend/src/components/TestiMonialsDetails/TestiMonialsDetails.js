import React from 'react';

const TestiMonialsDetails = ({testiMonialDetail}) => {
    const {name, description, img} = testiMonialDetail;
    console.log("testiMonialDetail"+testiMonialDetail)
    return (
        <div className="item">
            <div className="shadow-effect">
                <img className="img-circle" src={img} />
                <p style={{fontWeight:"bold"}}>{description}</p>
            </div>
            <div className="testimonial-name">
                <h5>{name}</h5>
               
            </div>
        </div>
    );
};

export default TestiMonialsDetails;