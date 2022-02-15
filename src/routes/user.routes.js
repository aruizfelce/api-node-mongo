import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

router.post(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkDuplicateUsernameOrEmail,
  ],
  usersCtrl.createUser
);

router.get("/",[authJwt.verifyToken,authJwt.isAdmin],usersCtrl.getUsers)
router.get("/:userId",[authJwt.verifyToken,authJwt.isAdmin],usersCtrl.getUser)
router.delete("/:userId",[authJwt.verifyToken,authJwt.isAdmin],usersCtrl.deleteUser)

export default router;