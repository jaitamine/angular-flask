import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
@Injectable()
export class AuthGuard implements CanActivate {
  user:boolean;
  constructor(private myRoute: Router){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      firebase.auth().onAuthStateChanged(
        (users) => {
          if (users) {
           this.user=true;
          } else {
            this.user= false;
          }
        }
      );
    if(this.user==true){
      return true;
    }else{
      this.myRoute.navigate(["home"]);
      return false;
    }
  }
}