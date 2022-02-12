import Product from "../models/Product";
import Joi  from "@hapi/joi";
import { storage } from "../libs/storage";

const schemaCreate = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  category: Joi.string().min(6).max(255).required(),
  price: Joi.number().required(),
  imgURL: Joi.string().min(6).max(255)
});

const schemaUpdate = Joi.object({
  name: Joi.string().min(6).max(255),
  category: Joi.string().min(6).max(255),
  price: Joi.number(),
  imgURL: Joi.string().min(6).max(255)
});

export const createProduct = async (req,res)=>{
    // validar producto
    const { error } = schemaCreate.validate(req.body)
    
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }
    
    const { name, category, price } = req.body;

    if(req.files){
      const resp= await storage(req.files,"imgURL",['.png','.jpg','.jpeg']);
      if(resp.isok==false) {
        return res.status(400).json(
          {error: resp.error}
      )
      }
      const nombreExpediente = resp.newName;
      
      try {
          const newProduct = new Product({
            name,
            category,
            price,
            imgURL: nombreExpediente
          });
      
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
        
            const productSaved = await newProduct.save();
        
            res.status(201).json(productSaved);
          } catch (error) {
            console.log(error);
            return res.status(500).json(error);
          }
      }
}

  export const getProducts = async (req, res) => {
    const products = await Product.find();
    return res.json(products);
  };

  export const getProductById = async (req, res) => {
    const { productId } = req.params;
  
    const product = await Product.findById(productId);
    res.status(200).json(product);
  };

  export const updateProductById = async (req, res) => {
    const { error } = schemaUpdate.validate(req.body)
    
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
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
 