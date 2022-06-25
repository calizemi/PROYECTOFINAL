import {useState,useContext} from "react"

import axios from 'axios'
import Swal from 'sweetalert2';

const initialState = {
    clientToken: null,
    made_payment: false,
    loading: false
};

const usePayment =()=>{
    const [statepay,setStatepay]=useState(initialState);

    const get_client_token = async () => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };
    
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/payment/get-token`, config);
    
            if (res.status === 200) {
                setStatepay({
                    ...statepay,
                    clientToken: res.data.braintree_token
                });
            } else {
                setStatepay({
                    ...statepay,
                    clientToken: null
                });
            }
        } catch(err) {
            setStatepay({
                ...statepay,
                clientToken: null
            });
        }
    }
    
    const process_payment = async(
        nonce,
        shipping_id,
        full_name,
        precio_total,
        direccion,
        ciudad,
        distrito,
        codigo_postal,
        telefono,
        cart_items
    ) => {
    

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };
    
        const body = JSON.stringify({
            nonce,
            shipping_id,
            full_name,
            precio_total,
            direccion,
            ciudad,
            distrito,
            codigo_postal,
            telefono,
            cart_items
        });
    
        setStatepay({
            ...statepay,
            loading: true
        });
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/make-payment`, body, config);
            if (res.status === 200 && res.data.success) {
                setStatepay({
                    ...statepay,
                    made_payment: true
                });

                Swal.fire(res.data.success, 'success');
                
            } else {
                setStatepay({
                    ...statepay,
                    made_payment: false
                });
                Swal.fire({
                    icon: 'error',
                    title: 'Error al procesar el pago',
                  });
                
            }
        } catch(err) {
            setStatepay({
                ...statepay,
                made_payment: false
            });
            Swal.fire({
                icon: 'error',
                title: 'Error al conectar con el servidor, intenta mas tarde.',
                text: err,
              });
        }
    
        setStatepay({
            ...statepay,
                made_payment: false,
                clientToken: null
            });
        window.scrollTo(0, 0);
    }
    
  

    return{
        statepay,
        process_payment,
        get_client_token
        
    }


}

export default usePayment