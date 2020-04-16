import * as YUP from 'yup'
import User from '@models/User'

const UserAccountConfirmationSchema = YUP.object().shape({
    token: YUP.string().required(),
})

export default async (req, res, next) => {
    const { token } = req.body;

    try {
        await UserAccountConfirmationSchema.validate(req.body)

        const user = await User.findOne({ email_confirm_code: token })

        if (!user) {
            throw new YUP.ValidationError('Invalid Confirmation Link !', req.body, 'token')
        }

        req.user = user

        return next()
    } catch (error) {
        return res.status(422).json({
            [error.path]: error.message
        })
    }
}