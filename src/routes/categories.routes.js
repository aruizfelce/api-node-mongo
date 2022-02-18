import { Router } from "express";
const router = Router();

import * as categoryCtrl from "../controllers/categories.controller";
import { authJwt, validateData } from "../middlewares";

router.get('/', authJwt.verifyToken,categoryCtrl.getCategories);

router.post('/',[validateData.validateCreateCategory, authJwt.verifyToken, authJwt.isAdmin],categoryCtrl.createCategory);

router.get('/:CategoryId',authJwt.verifyToken,categoryCtrl.getCategoryById);

router.put('/:CategoryId',[validateData.validateUpdateCategory, authJwt.verifyToken, authJwt.isAdmin],categoryCtrl.updateCategoryById);

router.delete('/:CategoryId',[authJwt.verifyToken, authJwt.isAdmin],categoryCtrl.deleteCategoryById);

export default router;