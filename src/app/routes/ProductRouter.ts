import { RouterManager } from '../core/RouterManager'
import productController from '../controller/productController'
import validateToken from "../core/middleware/ValidateToken";

const productRouterManager: RouterManager = new RouterManager('/product')
productRouterManager.post('/cateory',validateToken.validateToken, productController.addCategory)
productRouterManager.post('/create',validateToken.validateToken, productController.create)
productRouterManager.get('/list',validateToken.validateToken,productController.list )
productRouterManager.get('/category/list',validateToken.validateToken,productController.productList )

export default productRouterManager

