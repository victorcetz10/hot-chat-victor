import {connect} from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/ihc`

export async function connectDB(){
    await connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    console.log(`italian hot chat database is connected`)
}
