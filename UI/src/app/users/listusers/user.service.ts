import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class userService{
    constructor(private http:HttpClient){

    }

    getUsers(){
        return this.http.get('http://localhost:3000/users');
    }
    getUser(data): any{
        return this.http.get('http://localhost:3000/usDetail/'+data);
    }
    updateUser(data):any{
        return this.http.put('http://localhost:3000/updateUserDetail/',data);
    }
    addUser(data):any{
        return this.http.post('http://localhost:3000/adduser',data);
    }
    deleteUser(empId,delg_id):any{
        return this.http.delete('http://localhost:3000/deleteUser/'+empId+'/'+delg_id);
    }
}

