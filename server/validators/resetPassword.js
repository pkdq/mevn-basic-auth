import * as YUP from 'yup'

import User from '@models/User'
import ForgotPassword from '@models/ForgotPassword'

const ResetPasswordValidatorSchema = YUP.object().shape({
    password: YUP.string().min(6).required(),
    token: YUP.string().required()
})

export default async (req, res, next) => {
    const { password, token } = req.body

    try {
        await ResetPasswordValidatorSchema.validate({ password, token })

        const existingPasswordReset = await ForgotPassword.findOne({ token })

        if (!existingPasswordReset) {
            throw new YUP.ValidationError('Invalid token !', req.body, 'email')
        }

        const timeInMinutes = Math.ceil(
            (new Date().getTime() - new Date(existingPasswordReset.created_at).getTime()) / 60000
        )

        if (timeInMinutes > 5) {
            await ForgotPassword.findOneAndDelete({ token })
            throw new YUP.ValidationError('Token expired. Kindly issue a new password reset link', req.body, 'email')
        }

        const user = await User.findOne({ email: existingPasswordReset.email })

        req.user = user

        return next()
    } catch (error) {
        return res.status(422).json({
            [error.path]: error.message 
        })
    }
}