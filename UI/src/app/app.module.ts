import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { socketService } from './socket.service';
const pathDir:Routes = [{
  path:'',
  redirectTo:'dashboard',
  pathMatch: 'full'
  },
  {
path:'userData',

loadChildren:()=>import('./users/users.module').then(m=>m.userModule)
},
{
  path:'dashboard',
  loadChildren:()=>import('./dashboard/dasboard.module').then(m=>m.dashboardModule)
  }]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(pathDir)
  ],
  providers: [socketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
