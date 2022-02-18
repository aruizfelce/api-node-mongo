import { object } from "@hapi/joi";
import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    
    price: Number,
    imgURL: String,
    category: 
      {
        type: Schema.Types.ObjectId, //Va a almacenar el Id del rol
        ref: "Category" //Para enlazar con el modelo Roles
      }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Product", productSchema);