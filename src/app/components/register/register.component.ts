import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Register } from 'src/app/models/register';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isFormInvalid = false;
  isUserCreated = false;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  onSubmit(registerForm: NgForm) {
    if (!registerForm.valid) {
      this.isFormInvalid = true;
      this.isUserCreated = false;
      return;
    }

    const registerData = new Register(registerForm.value.firstName, registerForm.value.lastName, registerForm.value.emailAddress, registerForm.value.password);
    this.loginService.registerUser(registerData);
    this.isUserCreated = true;
    this.isFormInvalid = false;
    registerForm.resetForm();
  }
}
