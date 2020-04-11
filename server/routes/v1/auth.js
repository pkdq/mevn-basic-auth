import { Router } from 'express'
import RegisterValidatror from '@validators/register'

import RegisterController from '@controllers/v1/auth/RegisterController'

const authRouter = new Router()

authRouter.post('/register', RegisterValidatror, RegisterController.register)
authRouter.post('/register/confirm', RegisterController.confirm)

export default authRouter