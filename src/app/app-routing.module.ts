import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ManagerComponent } from './manager/manager.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'manager', component: ManagerComponent },

  { path: 'upload', component: UploadComponent, children: [{ path: 'result', component: ResultComponent }] }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }