import Product from "../models/Product";
import { storage } from "../libs/storage";
import Category from "../models/Category";


export const createProduct = async (req,res)=>{
   
    const { name, category, price } = req.body;
    if(req.files){
      const resp= await storage(req.files,"imgURL",['.png','.jpg','.jpeg']);
      if(resp.isok==false) {
        return res.status(400).json(
          {error: resp.error}
        )
      }
      const newFileName = resp.newName;
      try {
          const newProduct = new Product({
            name,
            category,
            price,
            imgURL: "/src/storage/imgs/" + newFileName
          });
           // checking for category
          const foundCategory = await Category.find({ name: { $in: category } });
          newProduct.category = foundCategory._id;

          const productSaved = await newProduct.save();
      
          res.status(201).json(productSaved);
        } catch (error) {
          console.log(error);
          return res.status(500).json(error);
        }
      }else{
        
        try {
            const newProduct = new Product({
              name,
              category,
              price
            });
            // checking for category
            const foundCategory = await Category.find({ name: { $in: category } });
            newProduct.category = foundCategory.map((cat) => cat._id);

            const productSaved = await newProduct.save();
            res.status(201).json(productSaved);
          } catch (error) {
            console.log(error);
            return res.status(500).json(error);
          }
      }
}

  export const getProducts = async (req, res) => {
    try {
      const products = await Product.find().populate('category').select('name price category');
      return res.json(products);
    } catch (error) {
      return res.status(400).json({message:"Ha ocurrido un error"})
    }
    
  };

  export const getProductById = async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId).select('name price category imgURL');
      return res.json(product);
    } catch (error) {
      return res.status(400).json({message:"Ha ocurrido un error"})
    }
    
  };

  export const updateProductById = async (req, res) => {
    if(req.files){
      const resp= await storage(req.files,"imgURL",['.png','.jpg','.jpeg']);
      if(resp.isok==false) {
        return res.status(400).json(
          {error: resp.error}
        )
      }
      const newFileName = resp.newName;
      req.body.imgURL = "/src/storage/imgs/" + newFileName
    }
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        {
          new: true,
        }
    );
    res.status(200).json(updatedProduct);
  };
  
  export const deleteProductById = async (req, res) => {
    const { productId } = req.params;
  
    await Product.findByIdAndDelete(productId);
  
    // code 200 is ok too
    res.status(204).json();
  };
 