import { Context } from "koa";
import library from "../db/entity/library";
import { User } from "../model/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Constants from "../constant/Constants";
import httpConstant from "../constant/httpConstants";
require("dotenv").config();


class UserService {
  constructor() {}
  async signup(ctx: Context) {
    const {firstName, lastName, userName, email, password, mobilNumber, role, status} = ctx.request.body
    let checkUser = await library.users.findOne({
      where: { email: email },
    });
    const hash = await bcryptjs.hash(password, 10);
    if (!checkUser) {
      await library.users.create({
        firstName:firstName,
        lastName:lastName,
        userName: userName,
        email: email,
        password: hash,
        mobilNumber: mobilNumber,
        role:role,
        status:status
      });
    } else {
      ctx.status = httpConstant.HTTP_CONFLICT;
      ctx.body =Constants.validationMessage.emailUnique;
    }
  }

  async login(ctx: Context) {
    try{
      const { email, password } = ctx.request.body;
      const checkUser = await library.users.findOne({
        where: { email: email },
      });
      if (checkUser == null || checkUser == "") {
        return {
          success: false,
          message: Constants.messages.emailNotFound,
          status: httpConstant.HTTP_REQUESTED_RESOURCE_NOT_FOUND,
        };
      }
      else {
        const { id, userName, email,role } = checkUser;
        const Match = await bcryptjs.compare(password, checkUser.password);

        if (Match == true) {
        const updateInfo= {
          status:'active'
        }
        await library.users.update(updateInfo, {
          where: { id: id },
        });        
          const token = jwt.sign(
            {
              id: id,
              name: userName,
              email: email,
              role: role,
            },
            process.env.JWT_SECRET
          );
          const data = {
            id: id,
            name: userName,
            email: email,
          }
          return {
            success: true,
            message: Constants.messages.successful,
            status: httpConstant.HTTP_SUCCESS_OK,
              data: data,
              token: token,
          }
        }else{
          return {
            success: false,
            message: Constants.messages.passwordNotNatch,
            status: httpConstant.HTTP_UNAUTHORISED,
          };
        }
      }
    }catch(error){
      return{
        success: false,
        status: httpConstant.HTTP_BAD_REQUEST,
        message: error,
      };
    }
    }
  

  async getUser(ctx: Context) {
    let userInfo = await library.users.findOne({
      where: { id: ctx.state.userDetails.id },
      attributes: [
        'id',          
        'firstName',
        'lastName',    
        'userName',
        'email',     
        'mobilNumber', 
        'role',
        'status',      
        ]
    });
    return { result: userInfo };
}
async getAllUser(ctx: Context){
  try {
    let response: any = {};
    if (ctx.state.userDetails.role === 'admin') {
      let { offset, limit, status, search, sortByCreatedAt }: any = ctx.query;
    limit = limit ? parseInt(limit) : 10;
    offset = offset ? parseInt(offset) : 0;
    if (offset >= 1) {
      offset = offset - 1;
    }
    let params = {
      limit,
      offset,
      where: { role: 'user', status: 'active'},
      order: [["id", "DESC"]],
    };
      let users = await library.users.findAll({ limit: params.limit,
        offset: params.offset,
        where: params.where,
        order: params.order,
        attributes: ['id',          
        'firstName',
        'lastName',    
        'userName',
        'email',     
        'mobilNumber', 
        'role',
        'status',],

      }); 
      users = JSON.parse(JSON.stringify(users));

      if (users.length > 0) {
        response = {
          status: httpConstant.HTTP_SUCCESS_OK,
          message: Constants.messages.successful,
          users,
        };
      } else {
        response = {
          success: false,
          status: httpConstant.HTTP_REQUESTED_RESOURCE_NOT_FOUND,
          message: Constants.messages.dataNotFound,
        };
      }
      return response;
    }else{
        response = {
        success: false,
        status: httpConstant.HTTP_UNAUTHORISED,
        message: Constants.messages.notAuthorized,
      }
      return response;

    }
    
  } catch (error) {
    return{
      success: false,
      status: httpConstant.HTTP_BAD_REQUEST,
      message: error,
    };
  }
}

  async generateJWT(user) { 
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        name: user.userName,
        role:user.role,
        email:user.email,
        exp: Math.floor(exp.getTime() / 1000),
      },
      process.env.JWT_SECRET
    );
  }

}
let userService: UserService = new UserService();
export default userService;
