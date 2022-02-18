import Joi  from "@hapi/joi";

export const schemaCreateUser = Joi.object({
  username: Joi.string().min(6).max(20).required()
        .messages({
            'string.min'   : 'El usuario debe tener al menos 6 caracteres',
            'string.max'   : 'El usuario debe tener máximo 20 caracteres',
            'any.required' : 'El nombre del usuario es requerido'
        }),
  password: Joi.string().min(6).max(255).required()
        .messages({
            'string.min'   : 'El password debe tener al menos 6 caracteres',
            'any.required' : 'El password es requerido'
        }),
  email: Joi.string().min(6).max(30).required().email()
        .messages({
            'string.min'   : 'El email debe tener al menos 6 caracteres',
            'string.max'   : 'El email debe tener máximo 20 caracteres',
            'any.required' : 'El email es requerido',
            'string.email' : 'Debe colocar un email válido'
        }),
    roles: Joi.valid("admin","user")
        .messages({
            "any.only": "El rol debe ser admin o user"
        })
});

export const schemaUpdateUser = Joi.object({
    username: Joi.string().min(6).max(20).empty()
    .messages({
        'string.min'   : 'El usuario debe tener al menos 6 caracteres',
        'string.max'   : 'El usuario debe tener máximo 20 caracteres',
        'any.required' : 'El nombre del usuario es requerido',
        'string.empty' : 'El nombre del usuario no puede ser vacío'
    }),
    password: Joi.string().min(6).max(255).empty()
    .messages({
        'string.min'   : 'El password debe tener al menos 6 caracteres',
        'any.required' : 'El password es requerido'
    }),
    email: Joi.string().min(6).max(30).email().empty()
    .messages({
        'string.min'   : 'El email debe tener al menos 6 caracteres',
        'string.max'   : 'El email debe tener máximo 20 caracteres',
        'any.required' : 'El email es requerido',
        'string.email' : 'Debe colocar un email válido'
    }),
});