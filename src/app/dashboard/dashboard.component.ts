import { viewDicom } from "./../../service/viewDicom.service";
import { Cloud } from "./../../service/cloud.service";
import { ConstServer } from "./../../service/const.service";
import { Component, OnInit, Pipe, EventEmitter, Output } from "@angular/core";
import { UploadFileService } from "src/service/UploadFileService.service";
import { FileUpload } from "src/entities/FileUpload";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Router, NavigationStart, CanDeactivate } from "@angular/router";
import { Url } from "url";
import { Observable } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  @Output() redirect: EventEmitter<any> = new EventEmitter();
  username: any;
  imageList: any[];
  rowIndexArray: any[];
  email: any;
  image: any;
  numberOfImage: any;
  List: any[] = [];
  List2: any[] = [];
  users: any[];
  imageUser: any;
  constructor(
    private service: UploadFileService,
    private getService: UploadFileService,
    private router: Router,
    private user: ConstServer,
    private userService: Cloud,
    private dicom: viewDicom
  ) {}
  ngOnInit(): void {
    // this.getService.getImageDetailList();
    this.username = this.user.getUsername();
    let emailUser: string;
    localStorage.setItem("email", this.user.email);
    emailUser = localStorage.getItem("user");
    this.users = this.userService.getUser(emailUser);
    this.email = this.users[1];
    this.imageUser = this.users[2];
    // this.List2 = this.userService.getListDicom(emailUser);
    this.List = this.userService.getList(emailUser);
    // this.numberOfImage = this.List.length;
    setTimeout(() => {

    }, 300);
    //console.log(this.List);
  }
  goupload() {
    this.router.navigate(["/upload-multiple"]);
  }
  viewAsDicom(a) {
    this.dicom.viewAsDicom(a); //emits the data to the parent

    // this.router.navigate(["display"]); //redirects url to new component
  }
}
