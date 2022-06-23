export const ApiProductos = 'https://62a2724acc8c0118ef6280c6.mockapi.io/productos';

export const getProductos = async () => {
    try {
        const response = await fetch(ApiProductos);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err.message);
    }
};

export const getProductoById = async(id)=>{
    try{
        const response = await  fetch(`${ApiProductos}/${id}`);
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err.message);
    }
}