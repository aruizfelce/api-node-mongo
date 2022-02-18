import { Router } from "express";
const router = Router();

import * as productsCtrl from "../controllers/products.controller";
import { authJwt, validateData } from "../middlewares";

router.get('/', authJwt.verifyToken,productsCtrl.getProducts);

router.post('/',[validateData.validateCreateProduct, authJwt.verifyToken, authJwt.isAdmin],productsCtrl.createProduct);

router.get('/:productId',authJwt.verifyToken,productsCtrl.getProductById);

router.put('/:productId',[validateData.validateUpdateProduct, authJwt.verifyToken, authJwt.isAdmin],productsCtrl.updateProductById);

router.delete('/:productId',[authJwt.verifyToken, authJwt.isAdmin],productsCtrl.deleteProductById);

export default router;