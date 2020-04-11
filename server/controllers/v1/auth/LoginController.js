import User from '@models/User'

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user) {
        if (user.comparePasswords(password)) {
            const token = user.generateToken()

            return res.status(200).json({ user, token })
        }
    }

    return res.status(400).json({
        error: 'These credentials do no match out records !!'
    })
}

export default {
    login
}