import { InformationComponent } from "./auth/signup/information/information.component";
import { ListComponent } from "./dashboard/list/list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProcessComponent } from "./process/process.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { HeaderComponent } from "./header/header.component";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UploadComponent } from "./upload/upload.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ManagerComponent } from "./manager/manager.component";
import { ResultComponent } from "./result/result.component";
import { AuthGuard } from "./auth.guard";
import { DcmDisplayComponent } from "./dcm-display/dcm-display.component";

const routes: Routes = [
  { path: "display", component: DcmDisplayComponent },
  { path: "dashboard", component: DashboardComponent, pathMatch: "full" },
  { path: "list", component: ListComponent },
  { path: "", component: HomeComponent },
  { path: "process", component: ProcessComponent },
  { path: "result", component: ResultComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "register", component: RegistrationComponent },
  { path: "manager", component: ManagerComponent },
  { path: "upload", component: UploadComponent },
  { path: "auth/signin", component: SigninComponent, pathMatch: "full" },
  { path: "auth/signup", component: SignupComponent, pathMatch: "full" },
  {
    path: "auth/information",
    component: InformationComponent,
    pathMatch: "full",
  },

  //pour controler les paths
  // ,canActivate: [AuthGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
