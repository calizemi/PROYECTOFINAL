import { useState } from "react";
//Custom Hook

const initialState = {
	cart: [],
}

const useInitialState = () => {
	const [state, setState] = useState(initialState);

	const addToCart = (product) => {

		// console.log("Add",product)

		
		let tempState ;
		if (state.cart.length > 0 ) {
			tempState = state.cart.map((item) =>{
				if (item.id === product.id){
					return { ...item, quantity: item.quantity + 1 } //Actualizamos la cantidad
				} else {
					return item
				}
		   	})
		}	
	
		let itemFind = state.cart.find(items => items.id === product.id);
		if (itemFind === undefined){
			setState({
				...state,
				cart: [...state.cart,product]
			});
		}else{
			setState({cart: [...tempState]});
		}

	};

	const addQuantity = (product) => {

		let tempState ;
		if (state.cart.length > 0 ) {
			tempState = state.cart.map((item) =>{
				if (item.id === product.id){
					return { ...item, quantity: item.quantity + 1 } //Actualizamos la cantidad
				} else {
					return item
				}
		   	})
		}	
	
			setState({cart: [...tempState]});

	};

	
	const removeQuantity = (product) => {

		let tempState ;
		if (state.cart.length > 0 ) {
			tempState = state.cart.map((item) =>{
				if (item.id === product.id){
					return { ...item, quantity: item.quantity===1?item.quantity:item.quantity-1 } //Actualizamos la cantidad
				} else {
					return item
				}
		   	})
		}	
	
			setState({cart: [...tempState]});

	};

	const removeFromCart = (product) => {
		setState({
			...state,
			cart: state.cart.filter(items => items.id !== product.id),
		});
	}


	return {
		state,
		addToCart,
		removeFromCart,
		addQuantity,
		removeQuantity
	}
}

export default useInitialState;
