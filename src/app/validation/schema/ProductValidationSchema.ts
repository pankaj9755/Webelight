import Joi from 'joi';
class ProductValidationSchema {
  constructor() { }

  static addCategory = Joi.object({
    name: Joi.string().required(),
  })
  static createProduct = Joi.object({
    name: Joi.string().required(),
    brand:Joi.string().required(),
    price: Joi.string().required(),
    categoryId:Joi.number().required()
  })
}
export default ProductValidationSchema;