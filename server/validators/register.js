import * as YUP from 'yup'
import User from '@models/User'

const RegisterSchema = YUP.object().shape({
    name: YUP.string().required(),
    email: YUP.string().email().required(),
    password: YUP.string().min(6).required()
})

export default async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        await RegisterSchema.validate({ name, email, password })

        const user = await User.findOne({ email })

        if (user) {
            throw new YUP.ValidationError('This user already exists !', req.body, 'email')
        }

        return next()
    } catch (error) {
        return res.status(422).json({
            [error.path]: error.message 
        })
    }
}