import { useState, useEffect, useContext } from "react";
import {
  Grid, Container, Button, Card, CardContent, CardMedia, FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AppContext from '../../context/AppContext'
import { sortBy } from "lodash";
import { Link } from "react-router-dom";
import "./tienda.css";
import axios from "axios";
import { ApiProductos } from "../../services/api";


const Tienda = () => {
  const urlApi = `${ApiProductos}` + `producto/producto`;
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const fetchProducts = async () => {
    axios.get(urlApi)
      .then(res => {
        setProducts(res.data.content)
      }).catch(err => {
        console.log(err);
      })
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const { addToCart } = useContext(AppContext);

  const handleClick = products => {
      addToCart({...products, quantity:1}) 
  }
  /* */


  return (
    <Container className="container-tienda">
      <Grid container container-filter mt={5} spacing={3} justifyContent="center">
        <Grid item md={10} >
          <Grid padding={2} className="ordenar">
            <FormControl fullWidth>
              <InputLabel>Ordenar por:</InputLabel>
              <Select label="Ordenar por:" className="select">
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="name">Nombre</MenuItem>
                <MenuItem value="precio">Precio</MenuItem>
                <MenuItem value="funcion">Funcion</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Grid container cont-card spacing={3} mt={2} mb={5} xs={12}>
            {products.length > 0 &&
              products.map((product) => (
                <Grid item md={4} key={product.idproducto} >
                  <Card height={200}>
                    <CardMedia component="img" height={200} width={250} image={product.url}
                    />
                    <CardContent>
                      <div className="description">
                        <p>{product.nombre}</p>
                        <span className="price">Precio $ {product.precio}</span>

                        <Link to={`/tienda/detalles/${product.idproducto}`} className="link">
                          <Button variant="contained" className="button">Ver detalles</Button>
                        </Link>
                        <Button variant="contained" onClick={() => handleClick(product)} className="button" >Agregar</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>

  )
};


export default Tienda;