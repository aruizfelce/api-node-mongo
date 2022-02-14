import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import Joi  from "@hapi/joi";
import {transporter} from "../config";
require('dotenv').config()

const schemaRegister = Joi.object({
  username: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required()
});

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required()
})

export const signUp = async (req, res) => {
    // validar usuario
    const { error } = schemaRegister.validate(req.body)
    
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }
    // Getting the Request Body
    const { username, email, password, roles } = req.body;
    // Creating a new User Object
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
      });
      // checking for roles
      if (roles) {
          const foundRoles = await Role.find({ name: { $in: roles } });
          newUser.roles = foundRoles.map((role) => role._id);
      } else { //si no lo encuentra le asigna el rol de user
          const role = await Role.findOne({ name: "user" });
          newUser.roles = [role._id];
      }
    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign(
        { id: savedUser._id, 
          username: savedUser.username,
          roles: savedUser.roles
        }, 
        process.env.TOKEN_SECRET, {
        expiresIn: '120', // 24 hours
    });
    res.json({token})
};

export const signIn = async (req, res) => {
    try {
          // validar usuario
        const { error } = schemaLogin.validate(req.body)
        
        if (error) {
            return res.status(400).json(
                {error: error.details[0].message}
            )
        }
        // Request body email can be an email or username
        const userFound = await User.findOne({ email: req.body.email }).populate(
          "roles"
        );
    
        if (!userFound) return res.status(400).json({ message: "User Not Found" });
    
        const matchPassword = await User.comparePassword(
          req.body.password,
          userFound.password
        );
    
        if (!matchPassword)
          return res.status(401).json({
            token: null,
            message: "Invalid Password",
          });
    
         // Create a token
      const token = jwt.sign(
        { id: userFound._id, 
          username: userFound.username,
          email:userFound.email,
          roles: userFound.roles
        }, 
        process.env.TOKEN_SECRET, {
        expiresIn: '1h', // 24 hours
      });

      const refreshToken = jwt.sign(
        { id: userFound._id, 
          username: userFound.username,
          email:userFound.email,
          roles: userFound.roles
        }, 
        process.env.TOKEN_SECRET_REFRESH, {
        expiresIn: 86400, // 24 hours
      });
      userFound.refreshToken = refreshToken;

      try {
        await userFound.save();
      } catch (error) {
        res.status(400).json({message:"Ha ocurrido un error"})
      }
    
        res.json({ token,refreshToken,username: userFound.username,roles: userFound.roles });
      } catch (error) {
          console.log(error);
      }
}

export const forgotPassword = async (req, res) => {
  const {email} = req.body;
  let verificationLink;
  if(!email) {
    res.status(400).json({message: 'El email es requerido'});
  }
  let message = 'Revise su email para reiniciar la contraseña';
  let emailStatus = 'Ok';
  try {
    const userFound = await User.findOne( {email});
    
    const token = jwt.sign(
      { id: userFound._id, 
        username: userFound.username,
        roles: userFound.roles
      }, 
      process.env.TOKEN_SECRET, {
      expiresIn: 600, // 10 minutos
    });
    verificationLink = process.env.URL + token;
    userFound.resetToken = token; //agrego el token al usuario
     
    userFound.save();
    
  } catch (error) {
      return res.json({message,emailStatus})
  }

  //envío de Email
  try {
    await transporter.sendMail({
      from: '"Olvidó la contraseña" <api@node.com>', // sender address
      to: email, // list of receivers
      subject: "Olvidó la contraseña", // Subject line
      //text: "Hello world?", // plain text body
      html: `
      <b>Haga click en el siguiente link para reiniciar la contraseña</b>
      <a href="${verificationLink}"> ${verificationLink} </a>
      `, // html body
    });
     
  } catch (error) {
    emailStatus= error;
    return res.status(400).json({message: "Ha ocurrido un error",emailStatus})
  }

  return res.json({message,emailStatus})
  
}

export const createNewPassword = async (req, res) => {
  const {newPassword} = req.body;
  const resetToken = req.headers.reset;
  let userFound;
  if(!(resetToken && newPassword)){
    res.status(400).json({message:'Todos los campos son requerido'});
  }

  try {
    //const decoded = jwt.verify(resetToken, process.env.TOKEN_SECRET);
    userFound = await User.findOne({ resetToken });
   
  } catch (error) {
    return res.status(401).json({message: 'No encuentra token'})
  }

  try {
    userFound.password = await User.encryptPassword(newPassword);
    await userFound.save();
  } catch (error) {
    return res.status(401).json({message:'Ha ocurrido un error'})
  }

  res.json({message:'Se ha cambiado la contraseña'})
}

export const refreshToken = async (req, res) => {
  const refreshToken = req.headers.refresh;
  let user;
  if(!refreshToken){
    res.status(400).json({message:"Falta refresh token"})
  }

  try {
    const verifyResult = jwt.verify(refreshToken,process.env.TOKEN_SECRET_REFRESH);
    const {email} = verifyResult;
    user = await User.findOne({email});
  } catch (error) {
    res.status(400).json({message:"Ha ocurrido un error"})
  }

  // Create a token
  const token = jwt.sign(
    { id: user._id, 
      username: user.username,
      email:user.email,
      roles: user.roles
    }, 
    process.env.TOKEN_SECRET, {
    expiresIn: '1h', 
  });

  res.json({message:'Ok',token})
}