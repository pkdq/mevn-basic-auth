import Dotenv from 'dotenv'

Dotenv.config()

export default {
    database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/mevn-basic-auth'
}