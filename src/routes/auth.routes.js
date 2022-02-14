import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import { verifySignup } from "../middlewares";

router.post('/signup',[verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signUp);
router.post('/signin', authCtrl.signIn);
router.put('/forgot-password', authCtrl.forgotPassword);
router.put('/new-password', authCtrl.createNewPassword);
router.post('/refresh-token', authCtrl.refreshToken);
export default router;