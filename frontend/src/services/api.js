export const ApiProductos ='http://localhost:8000/api/producto/producto';

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