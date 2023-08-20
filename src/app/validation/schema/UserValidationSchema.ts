import Joi, { valid } from 'joi';
class UserValidationSchema {
  constructor() { }

  static addUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    mobilNumber: Joi.number().required(),
    role: Joi.string().valid('admin', 'user').required(),
    status: Joi.string().valid('active', 'inactive').required(),
  })
  static userLogin =Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
  static getUserSchema = Joi.object({
    id: Joi.number().positive().required()
  })

 
}
export default UserValidationSchema;