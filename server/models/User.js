import BcryptJs from 'bcryptjs'
import Mongoose from 'mongoose'
import Mail from '@fullstackjs/mail'
import RandomString from 'randomstring'

import config from '@config'

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

export default Mongoose.model('User', UserSchema)