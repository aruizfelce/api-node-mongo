import Joi  from "@hapi/joi";

export const schemaCreateCategory = Joi.object({
  name: Joi.string().min(6).max(100).required().empty()
        .messages({
            'any.required' : 'El nombre de la categoría es requerida',
            'string.empty' : 'El nombre de la categoría no puede estar vacía',
            'string.min'   : 'El nombre de la categoría debe tener mínimo 6 caracteres',
            'string.max'   : 'El nombre de la categoría debe tener máximo 100 caracteres'
        })
});

export const schemaUpdateCategory = Joi.object({
  name: Joi.string().min(6).max(255)
        .messages({
            'any.required' : 'El nombre del producto es requerido'
        })
});