import "../../index.css";
import{Button, TextField,Radio,RadioGroup,FormControlLabel} from "@mui/material";
import{Controller, useForm} from "react-hook-form";
import {useState, useEffect, useContext } from "react";
import { rulesminmax,rulesText } from "../../services/rulesInputs";
import ShippContext from "../../context/ShippingContext"
import Context from "../../context/UserContext"


import { Theme } from "../../styles";
import { ThemeProvider } from "@mui/material/styles";

const Shipping =({nextstep,get_total,formData, setFormData})=>{

const {stateshipp,get_shipping_options}=useContext(ShippContext);
const {stateauth}=useContext(Context);

    // const [formData, setFormData] = useState({
    //     full_name: '',
    //     precio_total: 0,
    //     direccion: '',
    //     ciudad: '',
    //     distrito: '',
    //     codigo_postal: '',
    //     telefono: '',
    //     shipping_id: 0,
    // });

    // const [data, setData] = useState({
    //     instance: {}
    // });


    // const { 

    //     direccion,
    //     ciudad,
    //     distrito,
    //     codigo_postal,
    //     telefono,
    //     shipping_id,
    // } = formData;

      const {
          control,
          handleSubmit,
          formState: { errors },
        } = useForm({ });

    useEffect(() => {
        window.scrollTo(0,0)
        get_shipping_options()
    }, [])

console.log("ff",formData)
console.log(stateshipp)

    const onsubmit =(data)=>{   
        console.log(data)

        setFormData({
            ...formData,
            full_name: stateauth.user.get_full_name,
            precio_total: get_total,
            direccion: data.direccion,
            ciudad: data.ciudad,
            distrito: data.distrito,
            codigo_postal: data.codigo_postal,
            telefono: data.telefono, 
            shipping_id: data.shipping_id,
        })
       
        nextstep();
    }

    console.log("formdata",formData)
    

    return(
        <form onSubmit={handleSubmit(onsubmit)}>
            <h5>Entrega</h5><br/>

            <div className="div-input">
                <Controller
                  name={"ciudad"}
                  control={control}
                  rules={rulesText}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      label={"Ciudad"}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name={"distrito"}
                  control={control}
                  rules={rulesText}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={error ? true : false}
                      onChange={onChange}
                      value={value}
                      label={"Distrito"}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
              </div>

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

            <div className="div-input">
                <Controller
                  name={"codigo_postal"}
                  control={control}
                  rules={rulesminmax}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      label={"Codigo Postal"}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name={"telefono"}
                  control={control}
                  rules={rulesminmax}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={error ? true : false}
                      onChange={onChange}
                      value={value}
                      label={"Telefono"}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
              </div>

      <section>
        <h5>Metodo de Entrega</h5>
        <Controller
          render={({ field }) => (
            <RadioGroup aria-label="shipping_id" {...field}>
                {   stateshipp.shipping&&(
                    stateshipp.shipping.map((shipp, index) => (
                        <FormControlLabel value={shipp.id} control={<Radio />} label={shipp.nombre+"- $" + shipp.precio +" ("+shipp.tiempo_de_entrega+")"} />
                        
                    )))
    
                }
                
            </RadioGroup>
          )}
          name="shipping_id"
          control={control}
        />
      </section>
        


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