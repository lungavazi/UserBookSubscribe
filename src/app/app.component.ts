import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User book Subscribe';

  constructor(public authenticationService: LoginService, private router: Router) { }
  logout() {
    this.authenticationService.logout();
  }
}
