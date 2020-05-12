import JWT from 'jsonwebtoken'

import config from '@config'
import User from '@models/User'

export default async (req, res, next) => {
    try {
        const token = req.headers.access_token

        const data = JWT.verify(token, config.jwt_secret)

        const user = await User.findById(data.id)

        if (!user) {
            throw new Error()
        }

        req.user = user

        return next()
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized !'
        })
    }
}