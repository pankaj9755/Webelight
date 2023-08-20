import { Context } from "koa";
import httpConstants from "../../constant/httpConstants";
import ProductValidationSchema from "../schema/ProductValidationSchema";
import joiValidator from "../joi/validator";
export class ProductaValidator {
  constructor() {}
  async addCategory(ctx: Context) {
    joiValidator.joiValidation(
      ctx.request.body,
      ProductValidationSchema.addCategory
    );
    let response = {
      isValid: true,
      status: httpConstants.HTTP_SUCCESS_OK,
      data: {},
    };

    return response;
  }
  async createProduct(ctx: Context) {
    joiValidator.joiValidation(
      ctx.request.body,
      ProductValidationSchema.createProduct
    );
    let response = {
      isValid: true,
      status: httpConstants.HTTP_SUCCESS_OK,
      data: {},
    };

    return response;
  }
}

const productaValidator: ProductaValidator = new ProductaValidator();

export default productaValidator;
