import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/share';

@Injectable({ providedIn: "root" })
export class ConstServer {
  constructor(private router: Router) {}
  //   username=sessionStorage.getItem('username');
  // email=sessionStorage.getItem('username');
  // image=sessionStorage.getItem('image');
  username;
  email;
  imageUrl;
  numberOfImage;
  List: any[];
  setCons(name, emailUser, image) {
    this.username = name;
    this.email = emailUser;
    this.imageUrl = image;
  }
  setConsDicom(ImageUrlDicom) {
    this.imageUrl = ImageUrlDicom;
    // this.router.navigate(["display"]);
  }
  getList() {
    return this.List;
  }
  setList(List: any) {
    this.List = List;
    //this.router.navigate(["dashboard"]);
  }
  setListDicom(ListData: any[]) {
    this.List = ListData;
    this.router.navigate(["display"]);
    return ListData;
  }
  getUsername() {
    return this.username;
  }
  getnumberOfImage() {
    return this.numberOfImage;
  }
  setnumberOfImage(number) {
    this.numberOfImage = number;
  }
  getEmail() {
    return this.email;
  }
  getImage() {
    return this.imageUrl;
  }
}
