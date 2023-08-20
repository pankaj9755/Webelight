import { Context } from 'koa'

export function paginate ({ page, limit, type = null }){
    const offset = page * limit;
    const limit1 = limit;
  
    if (type != "" && type == "export") return {};
    else return { offset, limit };
};