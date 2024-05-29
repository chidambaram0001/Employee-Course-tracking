import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule} from "@angular/common/http"
import { CommonModule } from "@angular/common";
import { NgApexchartsModule } from "ng-apexcharts";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { dashboard } from "./dashboard/dashboard.comp";
import { dashboardService } from "./dashboard/dashboard.service";
const childPath:Routes = [{
    path:'',
    component:dashboard
}]
@NgModule({
    declarations:[dashboard],
    imports:[CommonModule, ReactiveFormsModule, RouterModule.forChild(childPath),
         HttpClientModule,NgApexchartsModule,FormsModule],
    exports:[],
    providers:[dashboardService]
})

export class dashboardModule{

}


