import User from "../models/User";
import Role from "../models/Role";
import  mongoose  from "mongoose";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('username email roles');
    return res.json(users);
  } catch (error) {
    return res.json(400).json({message:"Ha ocurrido un error"})
  }
  
};

export const getUser = async (req, res) => {
  const  {userId}  = req.params;
  if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(401).json({message:"Id inválido"});
  try {
    const userFound = await User.findById(userId).select("username email roles");
    if (!userFound) return res.status(400).json({ message: "User Not Found" }); 
    return res.json(userFound)
 } catch (error) {
   return res.json({message: "Ha ocurrido un error"})
 }
};

export const deleteUser = async (req, res) => {
  const  {userId}  = req.params;
  if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(401).json({message:"Id inválido"});
  try {
    const userFound = await User.findByIdAndDelete(userId);
    if (!userFound) return res.status(400).json({ message: "User Not Found" }); 
    return res.json(userFound)
 } catch (error) {
   return res.json({message: "Ha ocurrido un error"})
 }

}

export const updateUser = async (req, res) => {
  const  {userId}  = req.params;
  if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(401).json({message:"Id inválido"});
  try {
    const userFound = await User.findByIdAndUpdate(userId,req.body,
      {
        new: true,
      });
    if (!userFound) return res.status(400).json({ message: "User Not Found" }); 
    return res.json(userFound)
 } catch (error) {
   return res.json({message: "Ha ocurrido un error"})
 }
}