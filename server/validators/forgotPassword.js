import * as YUP from 'yup'

import User from '@models/User'
import ForgotPassword from '@models/ForgotPassword'

const ForgotPasswordValidatorSchema = YUP.object().shape({
    email: YUP.string().email().required()
})

export default async (req, res, next) => {
    const { email } = req.body

    try {
        await ForgotPasswordValidatorSchema.validate({ email })

        const user = await User.findOne({ email })

        if (!user) {
            throw new YUP.ValidationError('This email does not exists in out system !', req.body, 'email')
        }

        const forgotPassword = await ForgotPassword.findOne({ email })

        if (forgotPassword) {
            throw new YUP.ValidationError('Password reset link already sent !', req.body, 'email')
        }

        req.user = user

        return next()
    } catch (error) {
        return res.status(422).json({
            [error.path]: error.message 
        })
    }
}