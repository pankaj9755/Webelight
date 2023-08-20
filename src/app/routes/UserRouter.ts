import { RouterManager } from '../core/RouterManager'
import userController from '../controller/UserController'
import {ensureAuthenticated} from '../auth/authUtils'
import validateToken from "../core/middleware/ValidateToken";

const userRouterManager: RouterManager = new RouterManager('/user')
userRouterManager.post('/signup', userController.signup)
userRouterManager.post('/login', userController.login)
userRouterManager.get('/profile',validateToken.validateToken, userController.getUser);
userRouterManager.get('/all',validateToken.validateToken, userController.getAllUser);
export default userRouterManager

