import { Router } from 'express'

import RegisterController from '@controllers/v1/auth/RegisterController'

const authRouter = new Router()

authRouter.post('/register', RegisterController.register)
authRouter.post('/register/confirm', RegisterController.confirm)

export default authRouter