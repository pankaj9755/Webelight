import { Context } from "koa";
import httpConstants from "../../constant/httpConstants";
import UserValidationSchema from "../schema/UserValidationSchema";
import joiValidator from "../joi/validator";
export class UserValidator {
  constructor() {}

  async signup(ctx: Context) {
    joiValidator.joiValidation(
      ctx.request.body,
      UserValidationSchema.addUserSchema
    );
    let response = {
      isValid: true,
      status: httpConstants.HTTP_SUCCESS_OK,
      data: {},
    };

    return response;
  }
  async login(ctx: Context) {
    joiValidator.joiValidation(
      ctx.request.body,
      UserValidationSchema.userLogin
    );
    let response = {
      isValid: true,
      status: httpConstants.HTTP_SUCCESS_OK,
      data: {},
    };

    return response;
  }

  async getUser(ctx: Context) {
    //joi validation for request
    await joiValidator.joiValidation(
      ctx.params,
      UserValidationSchema.getUserSchema
    );

    let response = {
      isValid: true,
      status: httpConstants.HTTP_SUCCESS_OK,
      data: {},
    };

    return response;
  }
}

const userValidator: UserValidator = new UserValidator();

export default userValidator;
