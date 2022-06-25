export const ApiProductos ='http://localhost:8000/api/';

export const getProductos = async () => {
    try {
        const response = await fetch(ApiProductos+"producto/producto");
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err.message);
    }
};

export const getProductoById = async(id)=>{
    try{
        const response = await  fetch(ApiProductos+"producto"+id);
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err.message);
    }
}