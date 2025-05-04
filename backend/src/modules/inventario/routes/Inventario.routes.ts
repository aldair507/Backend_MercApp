import Router from 'express';
import { filtrarProductos ,calcularTotalInventario,listarProductos} from '../controllers/Inventario.controllers';

 const router = Router();


 router.get("/productos", listarProductos);
 router.post("/filtrar", filtrarProductos);
 router.get("/total", calcularTotalInventario);

 export { router };

