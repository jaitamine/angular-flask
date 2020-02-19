import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthenticationService } from 'src/service/authentication.service';
import { UploadService } from 'src/service/upload.service';
import { RouterModule } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { ManagerComponent } from './manager/manager.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    LoginComponent,
    RegistrationComponent,
    ResultComponent,
    ManagerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    JwtModule,
    AppRoutingModule,
    FormsModule,
    RouterModule

  ],
  providers: [AuthenticationService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
