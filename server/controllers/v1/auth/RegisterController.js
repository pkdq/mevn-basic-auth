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
    const user = await User.findOne({ email: req.user.email })
    user.email_confirm_code = null
    user.events.email_confirmed_at = new Date()
    user.save()

    // TODO: email_confirm_code not setting to null

    const token = user.generateToken()

    return res.status(200).json({ user, token })
}

const resend = async (req, res) => {
    if (!req.user.events.email_confirmed_at) {
        await req.user.sendActivationEmail()
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