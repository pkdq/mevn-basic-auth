import BcryptJs from 'bcryptjs'


import User from '@models/User'
import ForgotPassword from '@models/ForgotPassword'

const sendResetLinkEmail = async (req, res) => {
    await req.user.forgotPassword()

    return res.status(200).json({
        message: 'Password reset link sent !'
    })
}

const reset = async (req, res) => {
    await User.findOneAndUpdate({
        email: req.user.email
    }, {
        password: BcryptJs.hashSync(req.body.password)
    })

    await ForgotPassword.findOneAndDelete({ email: req.user.email })

    return res.status(200).json({
        message: 'Password Reset Successfully !!'
    })
}

export default {
    reset,
    sendResetLinkEmail
}