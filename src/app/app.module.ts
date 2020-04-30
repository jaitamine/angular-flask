import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ProcessComponent } from './process/process.component';





@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    LoginComponent,
    RegistrationComponent,
    ResultComponent,
    ManagerComponent,
    AboutComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    ProcessComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    JwtModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCAlHruZTXVqkKFFASkaWXrJwkDo_7Mbuk",
      authDomain: "angular-datebase.firebaseapp.com",
      databaseURL: "https://angular-datebase.firebaseio.com",
      projectId: "angular-datebase",
      storageBucket: "angular-datebase.appspot.com",
    }),
    AngularFireStorageModule


  ],
  providers: [AuthenticationService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
