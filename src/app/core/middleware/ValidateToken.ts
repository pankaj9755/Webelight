// import awsConstants from '../../constant/AWSConstants';
import httpConstants from "../../constant/httpConstants";
import { Context } from "koa";
import {ensureAuthenticated} from "../../auth/authUtils";
import library from "../../db/entity/library";
// import Constants from '../../constant/Constants';

export class ValidateToken {
  constructor() {}

  async validateToken(ctx: Context, next: any) {
    try {
      const reqHeaders = ctx.request.headers;
      const token: any = reqHeaders.idToken || reqHeaders.idtoken;
      if (!token) {
        ctx.status = httpConstants.HTTP_BAD_REQUEST;
        ctx.body = { message: "No idToken provided" };
        return;
      }

      const validateTokenResult: any =
        await ensureAuthenticated(token);
      // let role = validateTokenResult['payload']['custom:custom:userrole'] || validateTokenResult['payload']['custom:userrole'];
     console.log(validateTokenResult);
     
      let user = await library.users.findOne({
        where: {
          email: validateTokenResult.email,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      user = JSON.parse(JSON.stringify(user));

      ctx.state.userDetails = user;
      // let userRole = user.role;
      // console.log('logged user: ', user);

      if (!user) {
        ctx.status = httpConstants.HTTP_UNAUTHORISED;
        ctx.body = {
          error: "Unauthorized - Account deleted",
          isLogout: true,
          refreshToken: false,
        };
        return;
      }
      if (!user.status) {
        ctx.status = httpConstants.HTTP_UNAUTHORISED;
        ctx.body = {
          error: "Account inactivated",
          isLogout: true,
          refreshToken: false,
        };
        return;
      }

      if (user.role == 2 && user.idToken != token) {
        ctx.status = httpConstants.HTTP_UNAUTHORISED;
        ctx.body = {
          error: "Unauthorized",
          isLogout: true,
          refreshToken: false,
        };
        return;
      }
      // if (user.deletedAt) {
      //     ctx.status = httpConstants.HTTP_UNAUTHORISED;
      //     ctx.body = { error: 'Account deleted', isLogout: true };
      //     return;
      // }
      return next();
    } catch (error) {
      console.log(error);
      ctx.status = httpConstants.HTTP_UNAUTHORISED;
      ctx.body = {
        error: "Token expired or corrupted. " + error.message,
        isLogout: false,
        refreshToken: true,
      };
    }
  }
}

const validateToken: ValidateToken = new ValidateToken();
export default validateToken;
