import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { Button, ButtonGroup, Fab, IconButton } from '@mui/material';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';


const OrderItem = ({type, product }) => {
	const { removeFromCart,addQuantity,removeQuantity } = useContext(AppContext);

	const handleRemove = product => {
		removeFromCart(product);
	}

	const handleAddQuantity = product => {
		addQuantity(product);
	}

	const handleRemoveQuantity = product => {
		removeQuantity(product);
	}

	return (
		<>
		{
		type==="Cart"?(
		<div className="OrderItem">
			<figure>
				<img src={product.url} alt={product.name} />
			</figure>
			<p>{product.name}</p>
			<p>{product.quantity} x S/ {product.precio}</p>
			<IconButton onClick={() => handleRemove(product)} >
				<DeleteOutlineRoundedIcon sx={{ color: "#73548B" }}/>
			</IconButton>
		</div>
			):(
			<div className="basket-product">
			  <div className="basket-item">
				<div className="product-image">
				  <img src={product.url} alt={product.url} className="basket-img product-frame" />
				</div>
				<div className="product-details">
				  <h1><strong>{product.name}</strong></h1>
				</div>
			  </div>
			  <div className="price">S/ {product.precio}</div>
			  <div className="quantity">
				  
			<ButtonGroup size="small" color="secondary" variant="outlined" aria-label="outlined button group">
				<Button onClick={()=> handleRemoveQuantity(product)}  ><RemoveOutlinedIcon sx={{ color: "#73548B" }}/></Button>
				<Button >
				{product.quantity}
				</Button>
				<Button onClick={()=> handleAddQuantity(product)}><AddRoundedIcon sx={{ color: "#73548B" }}/></Button>
			</ButtonGroup>

			
			  </div>
			  <div className="subtotal">{(product.quantity * product.precio).toFixed(2)}</div>
			  <div className="" style={{position:"absolute",left:"-10px",top:"0px"}}>
				<IconButton sx={{border:"solid 1px #74548B",backgroundColor: "rgba(217,206,255,0.5)"}} onClick={() => handleRemove(product)} aria-label="add to shopping cart">
					<DeleteOutline sx={{ color: "#73548B" }}/>
				</IconButton>
			  </div>
			</div>
			)
		}
		
		      
		</>
	);
}

export default OrderItem;
