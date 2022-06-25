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
  const urlApi = `${ApiProductos}`+`producto/producto`;
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    axios.get(urlApi)
      .then(res => {
        setProducts(res.data.content)
      }).catch(err => {
        console.log(err);
      })
  };

  const handleOrderProducts = (e) => {
    const { value } = e.target;

    if (value === "Todos") {
      fetchProducts();
      return;
    }
    const sortedProducts = sortBy(products, value);
    setProducts(sortedProducts);
  };

  const handleFilterRange = async (e) => {
    const { value } = e.target;

    if (value === "Todos") {
      fetchProducts();
      return;
    }
    const products = await fetchProducts();
    const sortedProducts = products.filter(
      (product) => product.rango.trim() === value
    );
    setProducts(sortedProducts);
  };

  const handleFilterMaterial = async (e) => {
    const { value } = e.target;

    if (value === "Todos") {
      fetchProducts();
      return;
    }
    const products = await fetchProducts();
    const sortedProducts = products.filter(
      (product) => product.material.trim() === value
    );
    setProducts(sortedProducts);
  }

  const handleFilterFuncion = async (e) => {
    const { value } = e.target;

    if (value === "Todos") {
      fetchProducts();
      return;
    }
    const products = await fetchProducts();
    const sortedProducts = products.filter(
      (product) => product.funcion.trim() === value
    );
    setProducts(sortedProducts);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const { addToCart } = useContext(AppContext);

  const handleClick = product => {

    addToCart({ ...product, quantity: 1 });
  }

  return (
    <Container className="container-tienda">
      <Grid container container-filter mt={5} spacing={3} justifyContent="center">
        <Grid item md={2} className="menu"  >
          <div className="filtro">
            <h2>Filtrar por:</h2>
            <br />
            <FormControl fullWidth  >
              <InputLabel>Edades:</InputLabel>
              <Select label="Edades" onChange={handleFilterRange} >
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="1 a 3">1 a 3</MenuItem>
                <MenuItem value="3 a 5">3 a 5</MenuItem>
                <MenuItem value="5 a 7">5 a 7</MenuItem>
                <MenuItem value="7 a 9">7 a 9</MenuItem>
              </Select>
            </FormControl>

            <br />
            <FormControl fullWidth>
              <InputLabel>Material</InputLabel>
              <Select label="material" onChange={handleFilterMaterial}>
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="madera">Madera</MenuItem>
                <MenuItem value="madera/metal">Madera/Metal</MenuItem>
                <MenuItem value="varios">Varios</MenuItem>
                <MenuItem value="plastico">Plastico</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl fullWidth>
              <InputLabel>Funcion:</InputLabel>
              <Select label="funcion" onChange={handleFilterFuncion}>
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="psicomotricidad">Psicomotricidad</MenuItem>
                <MenuItem value="sensorial">Sensorial</MenuItem>
                <MenuItem value="reconocimiento">Reconocimiento</MenuItem>
                <MenuItem value="memoria">Memoria</MenuItem>
                <MenuItem value="geometria">Geometria</MenuItem>
                <MenuItem value="matematica">Matemática</MenuItem>
                <MenuItem value="mecanica">Mecánica</MenuItem>
              </Select>
            </FormControl>
            <br />
          </div>
        </Grid>

        <Grid item md={10} >
          <Grid padding={2} className="ordenar">
            <FormControl fullWidth>
              <InputLabel>Ordenar por:</InputLabel>
              <Select label="Ordenar por:" onChange={handleOrderProducts} className="select">
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