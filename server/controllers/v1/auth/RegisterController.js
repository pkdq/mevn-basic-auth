import User from '@models/User'

const register = async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password
    })

    return res.status(200).json({ user })
}

const confirm = (req, res) => {}

export default {
    register,
    confirm
}