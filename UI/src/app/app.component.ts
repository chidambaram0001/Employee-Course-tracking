import { Component } from '@angular/core';
// import { socketService } from './socket.service';
// import * as connections from '../../../websockets/common/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-proj';
  users = [];
  label:string;

  // constructor(private soketService:socketService){
  //   this.soketService.listenToServer(connections.change).subscribe((data)=>{
  //     console.log("Change")
  //     console.log(data)
  //   })
  //   this.soketService.listenToServer(connections.create).subscribe((data)=>{
  //     console.log("create")
  //     console.log(data)
  //   })
  // }

  // onChange(change){
  //   const idx = this.users.findIndex((user)=>user.id == change.id);
  //   this.users[idx].label = change.label;
  // }

  // onCreate(user){
  //   this.users.push(user)
  // }

  // createUser(label:string){
  //   const user = {id:Date.now().toString(),label};
  //   this.soketService.emitToServer(connections.create,user);
  //   this.label = ''
  // }

  // updateUser(label,id){
  //   this.soketService.emitToServer(connections.change,{id,label})
  // }

}
