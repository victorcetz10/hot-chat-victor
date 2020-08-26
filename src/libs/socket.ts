import {Server} from 'socket.io'

export default class Socket {
    io:Server

    public constructor (io:Server){
        this.io = io

        
    }

    public connect(){
        this.io.on('connection', (socket)=>{
            console.log(`new connection`)
        })
    }


}
