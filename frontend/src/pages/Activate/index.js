import {useParams} from 'react-router'
import { useState,useContext } from 'react'
import { Navigate } from 'react-router'

import Context from '../../context/UserContext'

import {Oval} from 'react-loader-spinner'

const Activate = () =>{
    const params = useParams()
    const { activate,stateauth } = useContext(Context);
    const [activated, setActivated] = useState(false);

    const activate_account = () => {
      const uid = params.uid
      const token = params.token
      activate(uid, token);
      setActivated(true);

      console.log(uid);
      console.log(token);
    }


    if (activated && !stateauth.loading)
    return <Navigate to='/' />;
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
          <div className="max-w-3xl mx-auto">
          
          {stateauth.loading ? 
          <button
            
          >
            <Oval
            color="#fff"
            width={20}
            height={20}
            />
          </button>:
          <button
          onClick={activate_account}
          
        >
          Activate Account
        </button>
        }

      
          </div>
        </div>
      
    )
  }

  export default Activate