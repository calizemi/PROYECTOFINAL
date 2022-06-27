import {useState} from "react"

import axios from 'axios'
import Swal from 'sweetalert2';

const initialState = {
    shipping: null,
}

const useShipping =()=>{

    const url='http://127.0.0.1:8000'

    const [stateshipp,setStateshipp]=useState(initialState);
    
    const get_shipping_options = async() => {
        
        const config = {
            headers: {
                'Accept': 'application/json',
            }
        };
    
        try {
            const res = await axios.get(`${url}/api/shipping/shipping`, config);
            console.log(res)
            if (res.status === 200) {
                setStateshipp( {
                    ...stateshipp,
                    shipping: res.data.shipping
                })
            } else {
                setStateshipp( {
                    ...stateshipp,
                    shipping: null,
                });
            }
        } catch(err) {
            setStateshipp( {
                ...stateshipp,
                shipping: null,
            });
        }
    }

    return{
        stateshipp,
        get_shipping_options
        
    }


}

export default useShipping