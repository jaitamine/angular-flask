import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ManagerComponent } from './manager/manager.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'result', component: ResultComponent },
  { path: 'upload', component: UploadComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }