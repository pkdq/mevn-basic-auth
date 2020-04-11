import Mongoose from 'mongoose'

const ForgotPasswordSchema = new Mongoose.Schema({
    email: String,
    token: String,
    created_at: Date
})

export default Mongoose.model('ForgotPassword', ForgotPasswordSchema)