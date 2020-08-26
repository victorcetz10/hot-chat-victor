import express from 'express'
import morgan from 'morgan'
import routes from './routes/index'
import { IPayload } from './libs/jwt'

//globals settings

declare global {
    namespace Express {
        interface Request {
            user?:IPayload
        }
    }
}

const app = express()

//settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'))
app.use(express.json())

//socket.io

//routes
app.use('/api', routes)

export default app