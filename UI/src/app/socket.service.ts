import { Injectable } from "@angular/core";
// import * as socketio from 'socket.io-client';
// import * as Connection from '../../../websockets/common/common';
import { Observable } from "rxjs";
const bckend = "http://localhost:3000";
@Injectable({
    providedIn: "root"
})
export class socketService{
    // protected clientSocket;
    // constructor(){
    //     this.clientSocket = socketio.connect(bckend)
    // }

    // listenToServer(connection:Connection){
    //     return new Observable((subscribe)=>{
    //         this.clientSocket.on(connection,(data)=>{
    //                 subscribe.next(data)
    //         })
    //     })
    // }
    // emitToServer(connection:Connection, data){
    //     this.clientSocket.emit(connection,data)
    // }
}