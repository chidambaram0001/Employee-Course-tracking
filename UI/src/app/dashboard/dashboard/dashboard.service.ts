import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class dashboardService{
    constructor(private http:HttpClient){

    }

    getUsers(){
        return this.http.get('http://localhost:3100/users');
    }
}

