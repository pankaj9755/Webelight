import { Context } from "koa";
import library from "../db/entity/library";
import { Op} from "sequelize";
import Constants from "../constant/Constants";
import httpConstant from "../constant/httpConstants";
import Sequelize from "sequelize";
import { paginate } from "../utils/HelperFunction";

require("dotenv").config();

class ProductService {
  constructor() { }

  async addCategory(ctx: Context) {
    try {
      if (ctx.state.userDetails.role === 'admin') {
        let { name } = ctx.request.body
        await library.categories.create({
          name: name,
        });
      } else {
        return {
          success: false,
          status: httpConstant.HTTP_UNAUTHORISED,
          message: Constants.messages.notAuthorized,
        }

      }
    } catch (error) {
      return {
        success: false,
        status: httpConstant.HTTP_BAD_REQUEST,
        message: error,
      };
    }
  }
  async createProduct(ctx: Context) {
    try {
      if (ctx.state.userDetails.role === 'admin') {
        let { name, brand, price, categoryId } = ctx.request.body
        await library.products.create({
          name: name,
          brand: brand,
          price: price,
          categoryId: categoryId
        });
      } else {
        return {
          success: false,
          status: httpConstant.HTTP_UNAUTHORISED,
          message: Constants.messages.notAuthorized,
        }

      }
    } catch (error) {
      return {
        success: false,
        status: httpConstant.HTTP_BAD_REQUEST,
        message: error,
      };
    }
  }

  async productList(ctx: Context) {
    try {
      let response: any = {};
        let categories = await library.categories.findAll({
                  attributes: ['id','name',]
                });
                categories = JSON.parse(JSON.stringify(categories));
console.log(categories);

        if (categories.length > 0) {
          response = {
            status: httpConstant.HTTP_SUCCESS_OK,
            message: Constants.messages.successful,
            categories,
          };
        } else {
          response = {
            success: false,
            status: httpConstant.HTTP_REQUESTED_RESOURCE_NOT_FOUND,
            message: Constants.messages.dataNotFound,
          };
        }
        return response;
  } catch (error) {
    return{
      success: false,
      status: httpConstant.HTTP_BAD_REQUEST,
      message: error,
    };
  }
}
async getAllProduct(ctx: Context){
  try {
    let response: any = {};
    let whereCondition: any=[]
      let { page, limit,search, sortByCreatedAt}: any = ctx.query;

      limit = limit ? parseInt(limit) : 10;
      page = page ? parseInt(page) : 0;
  
      if (page >= 1) {
        page = page - 1;
      }
  
    // let params = {
    //   limit,
    //   offset,
    //   query: {},
    //   order: [["id", "DESC"]],
    // };
    if (search && search.trim() != "") {
      whereCondition.push({
        [Sequelize.Op.or]: [
          Sequelize.where(
            Sequelize.Sequelize.col("name"),
            "LIKE",
            "%" + search.trim() + "%"
          ),
          Sequelize.where(
            Sequelize.Sequelize.col("brand"),
            "LIKE",
            "%" + search.trim() + "%"
          ),
          Sequelize.where(
            Sequelize.col("price"),
            "LIKE",
            "%" + search.trim() + "%"
          ),

        ],
      });
    }
    
      let query: any = {
        where: {
          [Sequelize.Op.and]: whereCondition,
        },
        ...paginate({ page, limit }),
        paranoid: true,
        order: [["createdAt", "DESC"]],
        underscored: true,
      };
      if (sortByCreatedAt) {
        Object.assign(query, { order: [["createdAt", sortByCreatedAt]] });
      } else {
        Object.assign(query, { order: [["createdAt", "DESC"]] });
      }
    let products = await library.products.findAndCountAll(query);

      products = JSON.parse(JSON.stringify(products));
console.log(products.rows);

      if (products.rows.length > 0) {
        response = {
          status: httpConstant.HTTP_SUCCESS_OK,
          message: Constants.messages.successful,
          products,
        };
      } else {
        response = {
          success: false,
          status: httpConstant.HTTP_REQUESTED_RESOURCE_NOT_FOUND,
          message: Constants.messages.dataNotFound,
        };
      }
      return response;    
  } catch (error) {
    return{
      success: false,
      status: httpConstant.HTTP_BAD_REQUEST,
      message: error,
    };
  }
}
}
let productService: ProductService = new ProductService();
    export default productService;
