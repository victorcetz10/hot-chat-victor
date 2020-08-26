import {Schema, model, Document} from 'mongoose'
import {compare, hash} from '../libs/crypt'

const userSchema = new Schema({
    email: {type:String, required:true, unique:true},
    nick_name: {type:String, lowercase:true, required:true, unique:true},
    role: {type:String, enum: ['cs', 'qa', 'admin'], default:'cs'},
    password:{type:String, required:true},
    
    account_activated: {type: Boolean, default:true},
    email_checked: {type:Boolean, default:false},
    timestamp: {type: Date, default:Date.now}
})

export interface IUser extends Document {
    email:string
    nick_name:string
    role:string
    password:string

    account_activated:boolean
    email_checked:boolean
    timestamp:Date

    comparePassword:(password:string)=>Promise<boolean>
}

userSchema.pre<IUser>('save', async function(next){
    let user = this
    if(!user.isModified('password')) return next()
    user.password = await hash(user.password)
    next()
})

userSchema.methods.comparePassword = async function(password:string):Promise<boolean> {
    return await compare(password, this.password)
}

export default model<IUser>('user', userSchema)