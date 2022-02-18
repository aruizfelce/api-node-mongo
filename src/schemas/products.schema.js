import Joi  from "@hapi/joi";

export const schemaCreateProduct = Joi.object({
  name: Joi.string().min(6).max(100).required().empty()
        .messages({
            'any.required' : 'El nombre del producto es requerido',
            'string.empty' : 'El nombre del producto no puede estar vacío',
            'string.min'   : 'El nombre del producto debe tener mínimo 6 caracteres',
            'string.max'   : 'El nombre del producto debe tener máximo 100 caracteres'
        }),
        
  category: Joi.string().min(6).max(50).required()
        .messages({
          'any.required' : 'La categoría es requerida',
          'string.empty' : 'La categoría no puede estar vacía',
          'string.min'   : 'La categoría debe tener mínimo 6 caracteres',
          'string.max'   : 'La categoría debe tener máximo 50 caracteres'
      }),
        
  price: Joi.number().required().positive()
        .messages({
            'number.base' : "El precio debe ser numérico",
            'number.positive' : 'El precio debe ser positivo',
            'any.required'  : 'El precio es requerido'
        }),
  imgURL: Joi.string().min(6).max(255)
});

export const schemaUpdateProduct = Joi.object({
  name: Joi.string().min(6).max(255)
        .messages({
            'any.required' : 'El nombre del producto es requerido'
        }),
        
  category: Joi.string().min(6).max(255),
        
  price: Joi.number()
        .messages({
            'number.base' : "El precio debe ser numérico"
        }),
  imgURL: Joi.string().min(6).max(255)
});


