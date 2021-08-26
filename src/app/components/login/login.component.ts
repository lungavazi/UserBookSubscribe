import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { SignIn } from '../../models/signIn';
import { User } from 'src/app/models/user';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isFormInvalid = false;
  isValidCredentials = false;
  userData: User[] = [];
  response = "";
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  onSubmit(signInForm: NgForm) {
    if (!signInForm.valid) {
      this.isFormInvalid = true;
      this.isValidCredentials = false;
      return;
    }
    const signIndata = new SignIn(signInForm.value.email, signInForm.value.password);
    this.loginService.authenticateData(signIndata).subscribe(response => this.response = response);
  }
}
