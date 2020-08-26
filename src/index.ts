import app from './app'
import {connectDB} from './libs/database'
import {Server} from 'http'
import SocketIO, {Socket} from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

async function main():Promise<Server> {

    await connectDB()

    let server =  app.listen(app.get('port'))

    return server
}

main().then((server:Server) => {
    // let io = SocketIO(server)
    // io.on('connection', (socket:Socket)=>{
    //     console.log(`socket connected`)
    // })
})