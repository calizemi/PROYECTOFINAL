import "./index.css";
import { Container, Grid, Button, TextField, Dialog } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { rulesText,rulesEmail,rulesContraseña } from "../../services/rulesInputs";
import logo from "../../assets/image/logo.png";
import signUp from "../../assets/image/signUp.png";
import Login from "../../components/Login";
import { useEffect,useContext } from "react";
import { Theme } from "../../styles";
import { ThemeProvider } from "@mui/material/styles";

import Context from '../../context/UserContext'




const SignUp = () => {
  
  useEffect(() => {
    window.scrollTo(0,0)
  }, []);

  const { signup } = useContext(Context);

  //const [accountCreated, setAccountCreated] = useState(false);
// const [open, setOpen] = useState(false)
// const handleClose=()=>{
// setOpen(false)
// }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ });

  const onsubmit = (data) => {
    //registerUser(data,"cliente");
   console.log(data);
    signup(data.nombre, data.apellidos, data.email, data.password, data.password);

    window.scrollTo(0,0)

  };
  
  return (
    <div className="bg">
      <Container className="Container">
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <form onSubmit={handleSubmit(onsubmit)}>
              <img width={150} src={logo} alt="" />

              <h2>Crea una cuenta en Peques</h2><br/>
              <div className="div-input">
                <Controller
                  name={"nombre"}
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
                      label={"Nombre"}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name={"apellidos"}
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
                      label={"Apelllidos"}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className="div-input">
                <Controller
                  name={"email"}
                  control={control}
                  rules={rulesEmail}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={error ? true : false}
                      onChange={onChange}
                      value={value}
                      label={"Ingresar email"}
                      helperText={error ? error.message : null}
                      type="email"
                      fullWidth
                    />
                  )}
                />
              </div>

              <div className="div-input">
                <Controller
                  name={"password"}
                  control={control}
                  rules={rulesContraseña}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      error={error ? true : false}
                      onChange={onChange}
                      value={value}
                      label={"Ingresar password"}
                      helperText={
                        error
                          ? error.message
                          : "Utiliza 8 carácteres que cuenten con letras y números"
                      }
                      type="password"
                      fullWidth
                    />
                  )}
                />
              </div>

              <div className="botom">
              <ThemeProvider theme={Theme}>
                <Button onClick={() => window.location.href="/"} 
                variant={"text"} 
                size="large" 
                color="analogous"
                sx={{ height: 47 }}
                >
                  Ir a Home
                </Button>
                </ThemeProvider>
                <ThemeProvider theme={Theme}>
                <Button 
                onClick={handleSubmit(onsubmit)} 
                variant={"contained"} 
                size="large"
                color="analogous"
                sx={{ height: 47 }}
                >
                  Registrar
                </Button>
                </ThemeProvider>
              </div>
            </form>
          </Grid>

          <Grid item md={5} xs={12} className="div-input">
            
            <img width={350} src={signUp} alt="" />
       
           
          </Grid>
        </Grid>
      </Container>
 
    </div>
  );
};


export default SignUp

