import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Grid, Button } from "@mui/material";
import "./detail.css";
import AppContext from '../../context/AppContext'
import { ApiProductos } from "../../services/api";
import axios from "axios";

const Detail = () => {

  const { id } = useParams();
  const urlApi = `${ApiProductos}`+`producto/producto/`+`${id}`;
  const history = useNavigate();
  const [product, setProduct] = useState({});
  
  useEffect(() => {
    //findToy();
    axios.get(urlApi)
      .then(res =>{
        console.log(res.data)
        setProduct(res.data)
      })
  }, []);

  const { addToCart } = useContext(AppContext);

  const handleClick = product => {

    addToCart({ ...product, quantity: 1 });
  }

  return (
    <Container sx={{ height: "100vh" }} >
      <Button sx={{ marginBottom: "20px" }} variant="outlined" onClick={() => history(-1)}>
        Back
      </Button>
      {Object.keys(product).length > 0 && (
        <Grid
          container
          alignItems="center"
          sx={{ height: "80vh", backgroundColor: "#fff", borderRadius: "30px" }}
        >
          <Grid item md={6}>
            <img style={{ borderRadius: "20%", boxShadow: "2px 0px 22px -2px rgba(0,0,0,0.75)", marginLeft: "50px" }} src={product?.content.url} width={400} alt="" />
          </Grid>
          <Grid item md={6} >
            <hr />
            <h2>{product?.content.nombre}</h2>
            <hr />
            <br />

            <Grid container>
              <Grid >
                <p>
                  <b>Código</b>: {product.content.idproducto}
                </p>
                <p>
                  <b>Nombre</b>: {product.content.nombre}
                </p>
                <p>
                  <b>Descripción</b>: {product.content.descripcion}
                </p>
                <p>
                  <b>Dimensiones</b>: {product.content.dimension} cm
                </p>
              </Grid>
              <Grid item md={12} mt={5}>
                <Button className="button" variant="contained" onClick={() => handleClick(product)} >Agregar al carrito</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}
export default Detail;