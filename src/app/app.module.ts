import { HeaderComponent } from "./header/header.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { UploadComponent } from "./upload/upload.component";

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { JwtModule } from "@auth0/angular-jwt";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AuthenticationService } from "src/service/authentication.service";
import { UploadService } from "src/service/upload.service";
import { RouterModule } from "@angular/router";
import { ResultComponent } from "./result/result.component";
import { ManagerComponent } from "./manager/manager.component";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ProcessComponent } from "./process/process.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FileSelectDirective } from "ng2-file-upload";
import { UploadFileService } from "src/service/UploadFileService.service";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { ListComponent } from "./dashboard/list/list.component";
import { AuthGuard } from "./auth.guard";
import { Cloud } from "src/service/cloud.service";
import { InformationComponent } from "./auth/signup/information/information.component";
import { ResultsService } from "src/service/results.service";
import { resultPipe } from "src/pipes/resultPipe.pipe";
import { DcmDisplayComponent } from "./dcm-display/dcm-display.component";
import { DicomViewerModule } from "ng-dicomviewer";
import { viewDicom } from "src/service/viewDicom.service";
import { CornerstoneDirective } from 'projects/dicom-viewer/src/lib/cornerstone.directive';
import { environment } from "../environments/environment"

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
    ProcessComponent,
    DashboardComponent,
    ListComponent,
    InformationComponent,
    resultPipe,
    DcmDisplayComponent,
    CornerstoneDirective
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
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    DicomViewerModule
  ],
  providers: [
    AuthenticationService,
    UploadService,
    UploadFileService,
    AuthGuard,
    Cloud,
    ResultsService,
    BrowserModule,
    FormsModule,
    CommonModule,
    viewDicom,
    // MatProgressSpinnerModule,
    DicomViewerModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
