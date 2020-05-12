import User from '@models/User'

const register = async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.generateToken()

    await user.sendActivationEmail()

    return res.status(200).json({ user, token })
}

const confirm = async (req, res) => {

    const user = await User.findOneAndUpdate({
        email: req.user.email
    }, {
        email_confirm_code: null,
        email_confirmed_at: new Date()
    }, {
        new: true
    })

    const token = user.generateToken()

    return res.status(200).json({ user, token })
}

const resend = async (req, res) => {
    if (!req.user.email_confirmed_at) {
        await req.user.sendActivationEmail()

        return res.status(200).json({
            message: 'Activation link sent !!'
        })
    }

    return res.status(200).json({
        message: 'Account already activated !!'
    })
}

export default {
    register,
    confirm,
    resend
}