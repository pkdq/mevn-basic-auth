import Dotenv from 'dotenv'

Dotenv.config()

const port = 4000

export default {
    port,
    database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/mevn-basic-auth',
    url: process.env.APP_URL || `http://localhost:${port}`,
    jwt_secret: process.env.JWT_SECRET || '123456'
}