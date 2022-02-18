import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt, verifySignup, validateData } from "../middlewares";

router.post(
  "/",
  [
    validateData.validateCreateUser,
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkDuplicateUsernameOrEmail,
  ],
  usersCtrl.createUser
);

router.get("/",[authJwt.verifyToken,authJwt.isAdmin],usersCtrl.getUsers)
router.get("/:userId",[authJwt.verifyToken,authJwt.isAdmin],usersCtrl.getUser)
router.delete("/:userId",[authJwt.verifyToken,authJwt.isAdmin],usersCtrl.deleteUser)
router.put("/:userId",[validateData.validateUpdateUser, authJwt.verifyToken,authJwt.isAdmin],usersCtrl.updateUser)

export default router;