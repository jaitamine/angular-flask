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
  { path: "display", component: DcmDisplayComponent, canActivate: [AuthGuard]},
  { path: "dashboard", component: DashboardComponent, pathMatch: "prefix", canActivate: [AuthGuard] },
  { path: "list", component: ListComponent, canActivate: [AuthGuard] },
  { path: "", component: HomeComponent },
  { path: "process", component: ProcessComponent, canActivate: [AuthGuard] },
  { path: "result", component: ResultComponent, pathMatch: "prefix", canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent,  },
  { path: "about", component: AboutComponent },
  { path: "register", component: RegistrationComponent },
  { path: "manager", component: ManagerComponent },
  { path: "upload", component: UploadComponent, pathMatch: "prefix", canActivate: [AuthGuard] },
  { path: "auth/signin", component: SigninComponent, pathMatch: "prefix" },
  { path: "auth/signup", component: SignupComponent, pathMatch: "prefix" },
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
