import { Router } from 'express'

import LoginValidator from '@validators/login'
import RegisterValidatror from '@validators/register'
import ResetPasswordValidator from '@validators/resetPassword'
import ForgotPasswordValidator from '@validators/forgotPassword'
import UserAccountConfirmationValidator from '@validators/UserAccountConfirmation'

import AuthMiddleware from '@middlewares/auth'

import UserController from '@controllers/v1/auth/UserController'
import LoginController from '@controllers/v1/auth/LoginController'
import RegisterController from '@controllers/v1/auth/RegisterController'
import ForgotPasswordController from '@controllers/v1/auth/ForgotPasswordController'

const authRouter = new Router()

authRouter.post('/register', RegisterValidatror, RegisterController.register)
authRouter.post('/register/confirm', UserAccountConfirmationValidator, RegisterController.confirm)

authRouter.post('/login', LoginValidator, LoginController.login)

authRouter.post('/password/email', ForgotPasswordValidator, ForgotPasswordController.sendResetLinkEmail)
authRouter.post('/password/reset', ResetPasswordValidator, ForgotPasswordController.reset)

// Logged in Routes
authRouter.post('/register/email/resend', AuthMiddleware, RegisterController.resend)
authRouter.get('/user', AuthMiddleware, UserController.getUser)

export default authRouter