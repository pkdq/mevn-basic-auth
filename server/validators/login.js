import * as YUP from 'yup'

const LoginSchema = YUP.object().shape({
    email: YUP.string().email().required(),
    password: YUP.string().required()
})

export default async (req, res, next) => {
    const { email, password } = req.body

    try {
        await LoginSchema.validate({ email, password })

        return next()
    } catch (error) {
        return res.status(422).json({
            [error.path]: error.message
        })
    }
}