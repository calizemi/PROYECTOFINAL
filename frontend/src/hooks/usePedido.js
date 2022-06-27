import {useState} from "react"

import axios from 'axios'
import Swal from 'sweetalert2';

const initialState = {
    orders: null,
    order: null
};

const usePedido =()=>{

    const url='http://127.0.0.1:8000'

    const [statepedido,setStatepedido]=useState(initialState);

    return{
        statepedido,  
    }


}

export default usePedido