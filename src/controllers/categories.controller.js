import Category from "../models/Category";

export const createCategory = async (req,res)=>{
    const { name } = req.body;
    try {
          const newCategory = new Category({
            name,
          });
          const CategorySaved = await newCategory.save();
      
          res.status(201).json(CategorySaved);
        } catch (error) {
          console.log(error);
          return res.status(500).json(error);
        }
}

  export const getCategories = async (req, res) => {
    try {
      const Categories = await Category.find().select('name');
      return res.json(Categories);
    } catch (error) {
      return res.status(400).json({message:"Ha ocurrido un error"})
    }
    
  };

  export const getCategoryById = async (req, res) => {
    try {
      const { CategoryId } = req.params;
      const Category = await Category.findById(CategoryId);
      return res.json(Category);
    } catch (error) {
      return res.status(400).json({message:"Ha ocurrido un error"})
    }
    
  };

  export const updateCategoryById = async (req, res) => {
    
     
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.CategoryId,
        req.body,
        {
          new: true,
        }
    );
    res.status(200).json(updatedCategory);
  };
  
  export const deleteCategoryById = async (req, res) => {
    const { CategoryId } = req.params;
  
    await Category.findByIdAndDelete(CategoryId);
  
    // code 200 is ok too
    res.status(204).json();
  };
 