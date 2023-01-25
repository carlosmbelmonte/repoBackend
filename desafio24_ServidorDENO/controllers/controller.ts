import { Response, Request } from "../deps.ts"

interface IProductos{
  nombre: string;
  descripcion: string;
  precio: string;
  id: number;
};

const productos: IProductos[] = [];

const getById = (x:number) =>{
    const idProducto = productos.find(producto => producto.id === x);
    return idProducto    
}

export const listarProductos = ({ response }: { response: Response; }) => {
    if(productos.length === 0){ response.body = "No existen productos";}
    else{ response.body = productos;}   
}

export const listarProducto = ({ params, response }: { params: { id: string }; response: Response; }) => {
    let iD = getById(parseInt(params.id))
    if (iD) { response.body = iD; } 
    else { response.body = "Producto no encontrado"; } 
}

export const incorporarProducto = async ({ request, response }: { request: Request; response: Response;}) => {
    const objeto = await request.body();
    const auxProd = await objeto.value;
    let newId;
  
    if(!auxProd.nombre || !auxProd.precio || !auxProd.descripcion){
      response.body = "Ingrese todos los datos del producto";
    }else{
      if(productos.length === 0){ newId=1; }
      else{ newId = productos.length + 1; } 
      auxProd.id = newId;
      productos.push(auxProd);
      response.body = {
        mensaje: "Producto agregado",
        Producto: auxProd
      };       
    }
}

export const modificarProducto = async ({ params, request, response }: { params: { id: string }; request: Request; response: Response; }) => {
    let iD = getById(parseInt(params.id))
    const objeto = await request.body();
    const auxProd = await objeto.value;
  
    if (!iD) {
      response.body = "Producto no encontrado"     
    } else {
      if(!auxProd.nombre || !auxProd.precio || !auxProd.descripcion){
        response.body = "Ingrese todos los datos del producto";
      }else{
        const newProducto = {
          "nombre": auxProd.nombre,
          "precio": auxProd.precio,
          "descripcion": auxProd.descripcion,
          "id": parseInt(params.id)
        }
        const index = productos.findIndex(producto => producto.id === parseInt(params.id));
        productos[index] = newProducto
        response.body = {
          mensaje: "Producto actualizado",
          Producto: newProducto
        };
      }
    } 
}

export const borrarProducto = async ({ params, request, response }: { params: { id: string }; request: Request; response: Response; }) => {
    let iD = getById(parseInt(params.id))
    const objeto = await request.body();
    const auxProd = await objeto.value;
  
    if (!iD) { response.body = "Producto no encontrado"; } 
    else {
      const index = productos.findIndex(producto => producto.id === parseInt(params.id));
      productos.splice(index, 1);
      response.body = {
        mensaje: "Producto eliminado",
        Producto: productos
      };
    } 
}