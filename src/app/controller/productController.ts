import { Context } from "koa";
import logger from "../../logger";
import httpConstants from "../constant/httpConstants";
import productService from "../service/productService";
import productValidator from "../validation/custom/ProductValidator";
import apiErrorHandler from "../utils/ApiErrorHandler";
class ProductController {
  constructor() {}

  async addCategory(ctx: Context) {
    try {
      let validation = await productValidator.addCategory(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }

      logger.info(
        `Controller : addCategory, Request-Body : ${JSON.stringify(
          ctx.request.body
        )}`
      );

      await productService.addCategory(ctx);

      ctx.status = httpConstants.HTTP_CREATED;
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : addCategory, Error : ${JSON.stringify(error)}`);
    }
  }
  async create(ctx: Context) {
    try {
      let validation = await productValidator.createProduct(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }

      logger.info(
        `Controller : createProduct, Request-Body : ${JSON.stringify(
          ctx.request.body
        )}`
      );

      await productService.createProduct(ctx);

      ctx.status = httpConstants.HTTP_CREATED;
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : createProduct, Error : ${JSON.stringify(error)}`);
    }
  }
  async list(ctx: Context) {
    try {
      let data = await productService.getAllProduct(ctx)            
      ctx.status = data.status;
      ctx.body = {
        message: data.message,
        data: data.products,
      };
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);
      logger.error(`Controller : getAllProduct, Error : ${JSON.stringify(error)}`)
    }
  }
  async productList(ctx: Context) {
    try {
      let data = await productService.productList(ctx)            
      ctx.status = data.status;
      ctx.body = {
        message: data.message,
        count: data.products.length,
        data: data.products,
      };
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);
      logger.error(`Controller : productList, Error : ${JSON.stringify(error)}`)
    }
  }
}

const productController: ProductController = new ProductController();
export default productController;
