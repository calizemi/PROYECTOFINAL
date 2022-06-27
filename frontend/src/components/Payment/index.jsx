import "../../index.css";
import PaymentContext from '../../context/PaymentContext';
import Context from '../../context/UserContext';
import AppContext from '../../context/AppContext';

import { Navigate } from 'react-router'



import{Button, Link} from "@mui/material";
import{Controller, useForm} from "react-hook-form";
import {useContext,useState,useEffect} from 'react'

import { Theme } from "../../styles";
import { ThemeProvider } from "@mui/material/styles";

import DropIn from 'braintree-web-drop-in-react';

const Payment= ({formData})=>{

    const {statepay,get_client_token,process_payment} = useContext(PaymentContext)
    const{stateauth} = useContext(Context)
    const{state,setState} = useContext(AppContext)
    const [data, setData] = useState({
        instance: {}
    });

    const { 
        full_name,
        precio_total,
        direccion,
        ciudad,
        distrito,
        codigo_postal,
        telefono,
        shipping_id,
    } = formData;

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({ });

    
    const buy = async ()=> {
     
        let nonce = await data.instance.requestPaymentMethod();
          process_payment(
              nonce,
              shipping_id,
              full_name,
              precio_total,
              direccion,
              ciudad,
              distrito,
              codigo_postal,
              telefono,
              state.cart

          );

        //   setState({
        //     cart : []
        // })
      
    }

  useEffect(() => {
      get_client_token();
  }, [stateauth.user]);
// console.log("pay",statepay)
//  console.log("carro",state.cart)
    // if(!stateauth.isAuthenticated)
    //     return <Navigate to='/login' />;


    const onsubmit =()=>{
        buy();

    }

   
   


    return(
  
              <form onSubmit={handleSubmit(onsubmit)}>

                <h5>Ingresar metodo de pago</h5>
                {!statepay.clientToken&&(
                    <Button>
                    Esperando Token
                  </Button>)}
                  {statepay.clientToken&&(
            <DropIn
              options={{
                  authorization: statepay.clientToken,
                  paypal: {
                      flow: 'vault'
                  }
              }}
              onInstance={instance => (data.instance = instance)}
            />)}


        
              
      


                <div className="botom">
                {!statepay.loading&&(
                <ThemeProvider theme={Theme}>
                <Button 
                onClick={handleSubmit(onsubmit)} 
                variant={"contained"} 
                size="large"
                color="analogous"
                sx={{ height: 47 }}
                >
                  Pagar
                </Button>
                </ThemeProvider>)}
                {statepay.loading&&(
                  <ThemeProvider theme={Theme}>
                  <Button 
                                  variant={"contained"} 
                                  size="large"
                                  color="analogous"
                                  sx={{ height: 47 }}>
        
                    ESpere por favor la transaccion aun no ha terminado, no cierre la ventan
                  </Button>
                  </ThemeProvider>)}

                )}
              </div>
               
            </form>

    )
   

}

export default Payment