import "../../index.css";
import{Grid, Button, TextField} from "@mui/material";
import{Controller, useForm} from "react-hook-form";
import { useEffect, useContext } from "react";
import { rulesminmax } from "../../services/rulesInputs";

import { Theme } from "../../styles";
import { ThemeProvider } from "@mui/material/styles";

const Shipping =({nextstep})=>{

    // const {stateauth}=useContext(Context);

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({ });

    const onsubmit =(data)=>{
        nextstep();
    }

    return(
        <form onSubmit={handleSubmit(onsubmit)}>
            <h5>Entrega</h5><br/>
            <div className="div-input">
                <Controller
                name={"direccion"}
                control = {control}
                rules ={rulesminmax}
                render ={({
                    field: {onChange,value},
                    fieldState: {error},
                }) =>(
                    <TextField
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    label={"Dirección"}
                    helperText={error? error.message:null}
                    fullWidth
                    />
                )}
                />
            </div>

            <div className="botom">
              
                <ThemeProvider theme={Theme}>
                <Button 
                onClick={handleSubmit(onsubmit)} 
                variant={"contained"} 
                size="large"
                color="analogous"
                sx={{ height: 47 }}
                >
                  Continuar
                </Button>
                </ThemeProvider>
              </div>

        </form>
    )
    


}
export default Shipping