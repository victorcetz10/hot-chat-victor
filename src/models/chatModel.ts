import {Schema, model, Document} from 'mongoose'
import { ICustomer } from './customerModel'
import { IVirtualProfile } from './virtualProfileModel'

const chatSchema = new Schema({
    customer: {type: Schema.Types.ObjectId, ref:'customer', required: true},
    virtual: {type: Schema.Types.ObjectId, ref:'virtual', required: true},
    notes: [String],
    last_message_date: {type: Number, default: (new Date()).getTime()},
    timestamp: {type: Date, default: Date.now()},
})


export interface IChat extends Document {
    customer:ICustomer
    virtual:IVirtualProfile
    notes:[string]
    last_message_date:number
    timestamp:Date
}

export default model<IChat>('chat', chatSchema)
