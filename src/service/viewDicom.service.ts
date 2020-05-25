import { Injectable, EventEmitter } from "@angular/core";
import { Observable, Observer, Subject } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Resp } from "src/entities/resp";
import { Router } from "@angular/router";
// import 'rxjs/add/operator/share';

@Injectable({ providedIn: "root" })
export class viewDicom {
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private router: Router) {}
  dicomnavigation() {
    console.log("secondreload");
    window.location.reload();
    return;
    // this.router.navigate(["display"], { queryParams: { a } });
  }
  viewAsDicom(a) {
    this.observer.next(a);
    localStorage.setItem("a", a);
    localStorage.setItem("load", "reload");
    // this.router.navigate(["display"], { queryParams: { a } });

    this.router.navigate(["display"]);
  }
}
