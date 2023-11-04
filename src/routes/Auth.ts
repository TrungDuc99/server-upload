import { Router } from 'express'

import { authenticateToken } from '../middleware/AuthenticateToken'
import AuthCallback from '../controller/AuthController'
const AuthRouter = Router()

AuthRouter.post('/login', AuthCallback.login)
AuthRouter.post('/loginbysocial', AuthCallback.loginBySocial)
AuthRouter.post('/register', AuthCallback.register)
AuthRouter.post('/registerbysocial', AuthCallback.registerBySocial)
AuthRouter.get('/me', authenticateToken, AuthCallback.me)

export default AuthRouter
