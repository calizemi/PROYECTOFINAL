import {useState} from "react"

import axios from 'axios'
import Swal from 'sweetalert2';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    loading: false
}


const useUser =()=>{
    const [stateauth,setStateauth]=useState(initialState);

    const check_authenticated = async()=>{

        setStateauth({
            ...stateauth,
            loading: true
        })

        if(localStorage.getItem('access')){
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                
            };

            const body = JSON.stringify({
                token: localStorage.getItem('access')
            });
        
        try {
            const res = await axios.post(`http://127.0.0.1:8000/auth/jwt/verify`,body,config);
            
            if(res.status === 200){
                setStateauth({
                    ...stateauth,
                    isAuthenticated:true
                });
            }else{
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                setStateauth({
                    ...stateauth,
                    isAuthenticated: false,
                    access: null,
                    refresh: null
                });
            }
        }catch(err){
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                setStateauth({
                    ...stateauth,
                    isAuthenticated: false,
                    access: null,
                    refresh: null
                })
            }
        } else {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                setStateauth({
                    ...stateauth,
                    isAuthenticated: false,
                    access: null,
                    refresh: null
                })
        }
        
    }

    const signup=async(first_name, last_name, email, password,re_password)=>{
        
        setStateauth({
            ...stateauth,
            loading: true
        })

        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            re_password
        });

        console.log(body);

        try{
            const res = await axios.post('http://127.0.0.1:8000/auth/users/',body,config);

            if(res.status ===201){
                Swal.fire('Te enviamos un correo, por favor activa tu cuenta. Revisa el correo de spam', 'success').then((result)=>{
                    if(result.isConfirmed){
                        setStateauth({
                            ...stateauth,
                            loading: false
                        })
                        window.location.href="/"
                    }
                })
            }else{
                setStateauth({
                    ...stateauth,
                    loading: false
                })
                    Swal.fire({
                        icon: 'error',
                        title: 'Ocurrrio un error, vuelva a intentarlo!!',
                        text: 'Error al crear la cuenta',
                      });
                }
                
            
            } catch (err){
              
            setStateauth({
                ...stateauth,
                loading: false
            })

            Swal.fire({
                icon: 'error',
                title: 'Error conectando al servidor,intentelo mas tarde',
                text: err,
              });

        };       

    }


    const load_user = async() => {
        if(localStorage.getItem('access')){
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
    
            try {
                const res = await axios.get(`http://127.0.0.1:8000/auth/users/me/`, config);
            
                if (res.status === 200) {
                    setStateauth({
                        ...stateauth,
                        user: res.data
                    });
                } else {
                    setStateauth({
                        ...stateauth,
                        user: null
                    });
                }
            }
            catch(err){
                setStateauth({
                    ...stateauth,
                    user: null
                });
            }
        } else {
            setStateauth({
                ...stateauth,
                user: null
            });
        }
    }
    
    const login = async (email, password) => {
        setStateauth({
            ...stateauth,
            loading: true
        })
    
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({
            email,
            password
        });
    
        try {
            const res = await axios.post(`http://127.0.0.1:8000/auth/jwt/create/`, body, config);
        
            if (res.status === 200) {
                localStorage.setItem('access', res.data.access);
                localStorage.setItem('refresh', res.data.refresh);
                setStateauth( {
                   ...stateauth,
                   isAuthenticated: true,
                   access: localStorage.getItem('access'),
                   refresh: localStorage.getItem('refresh')
                })

                load_user();
                setStateauth({
                    ...stateauth,
                    loading: false
                })
                Swal.fire('Inicio de Sesion con exito!!', 'success').then((result)=>{
                    if(result.isConfirmed){
                        window.location.reload();
                    }
                });
            } else {
                setStateauth({
                    ...stateauth,
                    loading: false
                })
                Swal.fire({
                    icon: 'error',
                    title: 'Error al iniciar sesion.',
                  });
                
            }
        }
        catch(err){
            setStateauth({
                ...stateauth,
                loading: false
            })
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesion.Intentalo mas tarde',
                text: err,
              });
            
        }
    }

    const activate = async (uid, token) => {
        setStateauth({
            ...stateauth,
            loading: true
        })
    
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({
            uid,
            token
        });

        console.log(body);
    
        try {
            const res = await axios.post(`http://127.0.0.1:8000/auth/users/activation/`, body, config);
        
            if (res.status === 204) {
                setStateauth({
                    ...stateauth,
                    loading: false
                })
                Swal.fire('Cuenta activada correctamente', 'success').then((result)=>{
                    if(result.isConfirmed){
                        window.location.href="/"
                    }
                });
                
            } else{

                setStateauth({
                    ...stateauth,
                    loading: false
                })

                Swal.fire({
                    icon: 'error',
                    title: 'Error activando cuenta',
                
                  });
                
               
            }
            
        }
        catch(err){
            setStateauth({
                ...stateauth,
                loading: false
            })
            Swal.fire({
                icon: 'error',
                title: 'Error al conectar con el servidor, intenta mas tarde.',
                text: err,
              });
        }
    };

const refresh = async () => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post(`http://127.0.0.1:8000/auth/jwt/refresh/`, body, config);
            
            if (res.status === 200) {
                localStorage.setItem('access', res.data.access);
                setStateauth({
                          ...stateauth,
                         access: localStorage.getItem('access')
                        })
            } 
        }catch(err){
            
        }
    } 
}
const logout = () => {
    localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            setStateauth( {
                ...stateauth,
                access :null,
                refresh:null,
                isAuthenticated: false,
                user: null,
            })

            Swal.fire('Sesion cerrada!', 'success').then((result)=>{
                if(result.isConfirmed){
                    window.location.reload();
                }
            });
  
}
    return{
        stateauth,
        check_authenticated,
        signup,
        load_user,
        login,
        activate,
        refresh,
        logout
        
    }


}

export default useUser