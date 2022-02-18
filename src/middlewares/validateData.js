import {schemaCreateProduct,schemaUpdateProduct} from "../schemas/products.schema";
import {schemaCreateUser,schemaUpdateUser} from "../schemas/users.schema";
import {schemaRegister,schemaLogin} from "../schemas/auth.schema";

export const validateCreateProduct = async (req, res, next) => {
    try {
        await schemaCreateProduct.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({error:error.details[0].message});
    }
    next();
 }

  export const validateUpdateProduct = async (req, res, next) => {
    try {
        await schemaUpdateProduct.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({error:error.details[0].message});
    }
    next();
 } 

 export const validateCreateUser = async (req, res, next) => {
    try {
        await schemaCreateUser.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({error:error.details[0].message});
    }
    next();
 }

  export const validateUpdateUser = async (req, res, next) => {
    try {
        await schemaUpdateUser.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({error:error.details[0].message});
    }
    next();
 } 

 export const validateSignUp = async (req, res, next) => {
    try {
        await schemaRegister.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({error:error.details[0].message});
    }
    next();
 }

 export const validateSignIn = async (req, res, next) => {
    try {
        await schemaLogin.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({error:error.details[0].message});
    }
    next();
 }

 


