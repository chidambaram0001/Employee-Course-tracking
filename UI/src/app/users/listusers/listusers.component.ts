import { Component } from "@angular/core";
import { userService } from "./user.service";
import { FormControl, FormControlName, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector:"listusers",
    templateUrl:"./listusers.component.html",
    styleUrls:['./listusers.css']
})

export class listUsers{
    protected list$;
    protected myForm:FormGroup;
    protected msg:string;
    constructor(private ser:userService, private rt:Router){
       
    }
    ngOnInit(){
        this.list$ = this.ser.getUsers()
    }
    delete(empId,delg_id){
       this.ser.deleteUser(empId,delg_id).subscribe((data)=>{
        if(data.deletedCount == 1){
            this.msg = 'User SucessFully Deleted'
            this.list$ = this.ser.getUsers();
            setTimeout(()=>{
                this.msg = '';
            },2000)
        }
    })
    }
    
}