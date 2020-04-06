import Express from 'express'
import Mongoose from 'mongoose'

// Server Imports
import config from './config'

Mongoose.connect(config.database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = Express()

app.listen(3000, () => {
    console.log('Server Started !')
})