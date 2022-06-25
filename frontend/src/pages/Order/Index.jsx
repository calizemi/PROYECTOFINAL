import React, { Fragment, useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import ShippContext from '../../context/AppContext'
import "./order.css";
import { Box, Button, IconButton, Step, StepButton, Stepper, Typography } from '@mui/material';
import OrderItem from '../../components/OrderItem';
import Shipping from '../../components/Shipping';
import Payment from '../../components/Payment';


const Index = (props) => {
  
  const { state } = useContext(AppContext);
  const { stateshipp } = useContext(ShippContext);
  const[formData,setFormData]=useState(
    {
      full_name: '',
      precio_total: 0,
      direccion: '',
      ciudad: '',
      distrito: '',
      codigo_postal: '',
      telefono: '',
      shipping_id: 0,
  }
  )
  
  console.log(stateshipp)
  var grandTotal = function(arr) {
		return arr.reduce((sum, i) => {
		  return (sum + (i.precio * i.quantity))
		}, 0).toFixed(2)
	  };

  //   const get_shipping_price=(shipping_id)=>{
  //     if(shipping_id===0){
  //       const precio=0
  //       return(precio)
  //     }else{
  //       stateshipp.shipping.map((shipp, index) => {
  //         if(shipp.id=shipping_id){
  //           return (shipp.precio)
  //         }else{
  //           const precio=0
  //         return(precio)
  //         }
  //       })

  //   }
  // }

  // const precio_shipp=get_shipping_price(formData.shipping_id)
  // console.log(formData)
  // console.log(precio_shipp)


    const steps = ['Bolsa de Compra', 'Despacho', 'Pago'];

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
  
    const totalSteps = () => {
      return steps.length;
    };
  
    const completedSteps = () => {
      return Object.keys(completed).length;
    };
  
    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };
  
    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };
  
    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStep = (step) => () => {
      setActiveStep(step);
    };
  
    const handleComplete = () => {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
    };

  
    console.log("pp",formData)

  return (
    <Fragment>
  <main> 
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {
                (activeStep + 1)===1?(

                <>
                  <div className="basket">
                    <div className="basket-labels">
                      <ul>
                        <li className="basket-item item-heading">Product</li>
                        <li className="price">Price</li>
                        <li className="quantity">Quantity</li>
                        <li className="subtotal">Subtotal</li>
                      </ul>
                    </div>
            
                    {state.cart.map(product => (
                        <OrderItem type="Order" product={product} key={`orderItem-${product.id}`} />
                      )
                    )}

<div className="summary-checkout">
                      <button onClick={handleNext} className="primary-button">Shipping</button>
                    </div>
            
                  </div>
                
                </>
            
                ):(
                  (activeStep + 1)===2?(
                    <div className="basket">
                     
                      <Shipping nextstep={handleNext} get_total={grandTotal(state.cart)} formData={formData} setFormData={setFormData}/>
                    </div>
                  ):(
                    <div className="basket">

                      <Payment formData={formData}/>
                    </div>
                    
                  )
                )
                

            }
            <aside>
                  <div className="summary">
                    <div className="summary-total-items"><span className="total-items strong"></span> Items in your Bag</div>
                    <div className="summary-subtotal">
                      <div className="subtotal-title">Subtotal</div>
                      <div className="subtotal-value final-value" id="basket-subtotal">{grandTotal(state.cart)} S/</div>
                    </div>
                    <div className="summary-subtotal">
                      <div className="subtotal-title">Descuento</div>
                      <div className="subtotal-value final-value" id="basket-subtotal">0.00 S/</div>
                    </div>
                    {/* <div className="summary-subtotal">
                      <div className="subtotal-title">Shipping</div>
                      <div className="subtotal-value final-value" id="basket-subtotal"> S/</div>
                    </div> */}
                    <div className="summary-total">
                      <div className="total-title">Total</div>
                      <div className="total-value final-value" id="basket-total">{grandTotal(state.cart)} S/</div>
                    </div>

                  </div>
                </aside>

            
          </React.Fragment>
        )}
      </div>
    </Box>
 

  </main>
  <steps>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />
      <Button onClick={handleNext} sx={{ mr: 1 }}>
        Next
      </Button>
      {activeStep !== steps.length &&
        (completed[activeStep] ? (
          <Typography variant="caption" sx={{ display: 'inline-block' }}>
            Step {activeStep + 1} already completed
          </Typography>
        ) : (
          <Button onClick={handleComplete}>
            {completedSteps() === totalSteps() - 1
              ? 'Finish'
              : 'Complete Step'}
          </Button>
        ))}
    </Box>
   </steps>

   </Fragment>
  )
 
}

export default Index;