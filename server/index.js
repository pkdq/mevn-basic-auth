import Path from 'path'
import Express from 'express'
import Mongoose from 'mongoose'
import BodyParser from 'body-parser' 

// Server Imports
import config from '@config'
import v1Router from '@routes'

// Client Setup Imports
import Webpack from 'webpack'
import WebpackConfig from './../webpack.config'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'

// Establish connection to the MondoDB
Mongoose.connect(config.database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
Mongoose.set('useFindAndModify', false)

// Create new ExpressJS Instance
const app = Express()

// Setup Client Server-Side Rendering (will launch our Client Side)
const compiler = Webpack(WebpackConfig)
app.use(WebpackDevMiddleware(compiler, {
    hot: true
}))
app.use(WebpackHotMiddleware(compiler))

// To Parse incoming request bodies. Available under the req.body property 
app.use(BodyParser.json())

// Register all the routes
app.use(v1Router)

// Middleware to Serve static files like images
app.use(Express.static(Path.resolve(__dirname, 'public')))

// Wildcard Route to handle non-existing routes (client will handle the SPA routes)
app.get('*', (req, res) => {
    return res.sendFile(Path.resolve(__dirname, 'public/index.html'))
})

// Create server and listen to a PORT
app.listen(3000, () => {
    console.log('Server Started !')
})