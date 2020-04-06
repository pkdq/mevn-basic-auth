import Express from 'express'
import Mongoose from 'mongoose'

// Server Imports
import config from '@config'
import v1Router from '@routes'

Mongoose.connect(config.database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = Express()

app.use(v1Router)

app.get('*', (req, res) => {
    return res.status(200).json({ message: 'Here client index page will be rendered !' })
})

app.listen(3000, () => {
    console.log('Server Started !')
})