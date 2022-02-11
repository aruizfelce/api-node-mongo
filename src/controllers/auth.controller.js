import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import Joi  from "@hapi/joi";
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
        expiresIn: 86400, // 24 hours
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
          roles: userFound.roles
        }, 
        process.env.TOKEN_SECRET, {
        expiresIn: 86400, // 24 hours
      });
    
        res.json({ token });
      } catch (error) {
          console.log(error);
      }
}
