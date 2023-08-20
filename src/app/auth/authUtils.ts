// import { config } from '../../config';
import jwt from "jsonwebtoken";
import { Context } from "vm";
require("dotenv").config();

export const ensureAuthenticated = async (tocke) => {
  let newAuth =tocke;
// console.log(newAuth)
  let response;
  if (!newAuth) {
        response = {
      statusCode: 401,

      body: JSON.stringify("ERRMSG.TOKEN_INVALID"),
    };
    return response;
  } else {
    if (newAuth && newAuth.split(" ")[0] === "Bearer") {
      let token = newAuth.split(" ")[1];
      if (token) {
        return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            response = {
              statusCode: 401,

              body: JSON.stringify("SSSSSSSSSSSSs"),
            };
            return response;
          } else {
            return decoded;
          }
        });
      } else {
        return null;
      }
    } else {
      response = {
        statusCode: 401,

        body: JSON.stringify("ERRMSG.TOKEN_INVALID"),
      };
      return response;
    }
  }
};

