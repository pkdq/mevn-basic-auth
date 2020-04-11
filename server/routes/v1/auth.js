import { Router } from 'express'
import LoginValidator from '@validators/login'
import RegisterValidatror from '@validators/register'

import LoginController from '@controllers/v1/auth/LoginController'
import RegisterController from '@controllers/v1/auth/RegisterController'

const authRouter = new Router()

authRouter.post('/register', RegisterValidatror, RegisterController.register)
authRouter.post('/register/confirm', RegisterController.confirm)

authRouter.post('/login', LoginValidator, LoginController.login)

export default authRouter