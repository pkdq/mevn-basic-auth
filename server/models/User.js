import JWT from 'jsonwebtoken'
import BcryptJs from 'bcryptjs'
import Mongoose from 'mongoose'
import Mail from '@fullstackjs/mail'
import RandomString from 'randomstring'

import config from '@config'

import ForgotPassword from '@models/ForgotPassword'

const UserSchema = new Mongoose.Schema({
    name: String,
    email: String,
    events: {
        created_at: Date,
        updated_at: Date,
        email_confirmed_at: Date
    },
    password: String,
    email_confirm_code: String
})

UserSchema.pre('save', function() {
    this.password = BcryptJs.hashSync(this.password)
    this.email_confirm_code = RandomString.generate(72)
    this.events.created_at = new Date()
})

UserSchema.post('save', async function() {
    await new Mail('confirm-account')
        .to(this.email, this.name)
        .subject('Please confirm your account')
        .data({
            name: this.name,
            url: `${config.url}/auth/register/confirm/${this.email_confirm_code}`
        })
        .send()
})

UserSchema.methods.generateToken = function() {
    return JWT.sign({ id: this._id}, config.jwt_secret)
}

UserSchema.methods.comparePasswords = function(password) {
    return BcryptJs.compareSync(password, this.password)
}

UserSchema.methods.forgotPassword = async function() {
    const token = RandomString.generate(72)

    await ForgotPassword.create({
        token,
        email: this.email,
        created_at: new Date()
    })

    await new Mail('forgot-password')
        .to(this.email, this.name)
        .subject('Password reset')
        .data({
            url: `${config.url} /auth/password/reset/${token}`,
            name: this.name
        })
        .send()
}

export default Mongoose.model('User', UserSchema)