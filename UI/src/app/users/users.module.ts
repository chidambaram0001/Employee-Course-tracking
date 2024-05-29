import { NgModule } from "@angular/core";
import { listUsers } from "./listusers/listusers.component";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule} from "@angular/common/http"
import { userService } from "./listusers/user.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { userDetail } from "./userDetail/userDetail.component";
import { editUser } from "./editUser/edit.component";
import { addUser } from "./adduser/adduser.component";
const childPath:Routes = [{
    path:'',
    component:listUsers
},
{
    path:'userDetail/:id',
    component:userDetail
},
{
    path:'edit/:id',
    component:editUser
},
{
    path:'add',
    component:addUser
}]
@NgModule({
    declarations:[listUsers,userDetail,editUser,addUser],
    imports:[CommonModule, ReactiveFormsModule, RouterModule.forChild(childPath), HttpClientModule],
    exports:[],
    providers:[userService]
})

export class userModule{

}