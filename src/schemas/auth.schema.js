import Joi  from "@hapi/joi";

export const schemaRegister = Joi.object({
    username: Joi.string().min(6).max(20).required().empty()
    .messages({
        'string.min'   : 'El usuario debe tener al menos 6 caracteres',
        'string.max'   : 'El usuario debe tener máximo 20 caracteres',
        'any.required' : 'El nombre del usuario es requerido',
        'string.empty' : 'El usuario no puede ser una cadena vacía'
    }),
    email: Joi.string().min(6).max(50).required().email().empty()
    .messages({
        'string.min'   : 'El email debe tener al menos 6 caracteres',
        'string.max'   : 'El email debe tener máximo 50 caracteres',
        'any.required' : 'El email es requerido',
        'string.email' : 'Debe colocar un email válido',
        'string.empty' : 'El email no puede ser una cadena vacía'
    }),
    password: Joi.string().min(6).max(20).required().empty()
    .messages({
        'string.min'   : 'El password debe tener al menos 6 caracteres',
        'string.max'   : 'El password no puede ser mayor de 20 caracteres',
        'any.required' : 'El password es requerido',
        'string.empty' : 'El password no puede ser una cadena vacía'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
        'any.required' : 'La confirmación del password es requerido',
        'any.only'     : 'Los password deben coincidir',
    })
  
  });
  
  export const schemaLogin = Joi.object({
    email: Joi.string().required().email().empty()
    .messages({
        'any.required' : 'El email es requerido',
        'string.email' : 'Debe colocar un email válido',
        'string.empty'    : 'El email no puede estar vacío'
    }),
    password: Joi.string().required().empty()
    .messages({
        'any.required' : 'El password es requerido',
        'string.empty'    : 'El password no puede estar vacío'
    }),
  })