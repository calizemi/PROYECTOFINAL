import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderItem from '../components/OrderItem'
import AppContext from '../context/AppContext'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import "../pages/Order/shoppingCart.css"


const ShoppingCart = ({navToggle}) => {
	const { state } = useContext(AppContext);


	var grandTotal = function(arr) {
		return arr.reduce((sum, i) => {
		  return sum + (i.precio * i.quantity)
		}, 0)
	  };

	  const navigate = useNavigate() //Importar de React-router-dom

	  const handleCheckOut = ()=>{
		navToggle()
		return navigate("/order")// Navegar
	  }


	return (
		<aside className="MyOrder">
			<div className="title-container" style={{marginBottom:"1rem"}}>
			<LocalGroceryStoreIcon />
				<p className="title">My order</p>
			</div>
			<div className="my-order-content">
				{state.cart.map(product => (
					 <OrderItem type="Cart" product={product} key={`orderItem-${product.id}`} />
				))}
				<div className="order">
					<p>
						<span>Total</span>
					</p>
					<p style={{fontSize:"1rem"}}> S/ {grandTotal(state.cart)}</p>
				</div>
					<button onClick={handleCheckOut} style={{backgroundColor:"#73548B"}} disabled={state.cart.length > 0 ?"":"disabled"} className="primary-button">
						Checkout
					</button>
			</div>
		</aside>
	);
}

export default ShoppingCart;
