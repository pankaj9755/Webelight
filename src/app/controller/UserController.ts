import { Context } from "koa";
import logger from "../../logger";
import httpConstants from "../constant/httpConstants";
import userService from "../service/UserService";
import userValidator from "../validation/custom/UserValidator";
import apiErrorHandler from "../utils/ApiErrorHandler";
import { User } from '../model/User'


class UserController {
  constructor() { }

  async signup(ctx: Context) {
    try {
      let validation = await userValidator.signup(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }

      logger.info(
        `Controller : signup, Request-Body : ${JSON.stringify(
          ctx.request.body
        )}`
      );

      await userService.signup(ctx);

      ctx.status = httpConstants.HTTP_CREATED;
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : signup, Error : ${JSON.stringify(error)}`);
    }
  }

  async login(ctx: Context) {
    try {
      let validation = await userValidator.login(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }

      let result = await userService.login(ctx);
      ctx.status = httpConstants.HTTP_SUCCESS_OK;
      ctx.body = result;
      logger.info(
        `Controller : user, Response-Body : ${JSON.stringify(ctx.body)}`
      );
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : user, Error : ${JSON.stringify(error)}`);
    }
  }

  async getUser(ctx: Context) {
    try {
      let user = await userService.getUser(ctx)      
      ctx.status = httpConstants.HTTP_SUCCESS_OK
      ctx.body = user
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : getUser, Error : ${JSON.stringify(error)}`)
    }
  }
  async getAllUser(ctx: Context) {
    try {
      let data = await userService.getAllUser(ctx) 
      console.log(data);
           
      ctx.status = data.status;
      ctx.body = {
        message: data.message,
        count: data.users.length,
        data: data.users,
      };
    } catch (error) {
      apiErrorHandler.errorHandler(error, ctx);

      logger.error(`Controller : getAllUser, Error : ${JSON.stringify(error)}`)
    }
  }

}

const userController: UserController = new UserController();
export default userController;
