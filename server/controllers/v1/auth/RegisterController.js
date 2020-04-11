import User from '@models/User'

const register = async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.generateToken()

    return res.status(200).json({ user, token })
}

const confirm = (req, res) => {}

export default {
    register,
    confirm
}