import Category from "../models/Category";


export const checkCategory = async (req, res, next) => {
  const {category} = req.body;
  if(!category) return res.status(400).json({message: "Debe seleccionar la categoría"});
  try {
    const user = await Category.findOne({ name: category });
    if(!user) return res.status(400).json({message: "La categoría no existe"});
    
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};