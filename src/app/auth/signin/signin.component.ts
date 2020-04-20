import { AuthenticationService } from 'src/service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Log } from 'src/service/log.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router, private log: Log) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.authService.signInUser(email, password).then(
      () => {
        localStorage.setItem('user', email);
        this.router.navigate(['/upload']);
      },
      (error) => {
        this.log.logAngular('user authentication error- password/email : ');
        this.errorMessage = error;
      }
    );
  }

}