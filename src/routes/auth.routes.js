import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import { verifySignup,validateData } from "../middlewares";

router.post('/signup',[validateData.validateSignUp, verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signUp);
router.post('/signin', validateData.validateSignIn,authCtrl.signIn);
router.put('/change-password', authCtrl.changePassword);
router.put('/forgot-password', authCtrl.forgotPassword);
router.put('/new-password', authCtrl.createNewPassword);
router.post('/refresh-token', authCtrl.refreshToken);
export default router;