import { Router } from "../deps.ts"
import { listarProductos, listarProducto, incorporarProducto, modificarProducto, borrarProducto } from "../controllers/controller.ts";

const router = new Router();

router.get('/api/productos', listarProductos);
router.get('/api/productos/:id', listarProducto);
router.post('/api/productos', incorporarProducto);
router.put('/api/productos/:id', modificarProducto);
router.delete('/api/productos/:id', borrarProducto);

export default router;
