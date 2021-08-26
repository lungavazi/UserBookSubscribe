import { Injectable } from '@angular/core';
import { SignIn } from '../models/signIn';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Register } from '../models/register';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly mochedUser = new SignIn('LungaBhara@gmail.com', 'lunga');
  userData: User[] = [];
  isAuthenticated = false;
  constructor(private http: HttpClient, private router: Router) { }

  authenticateData(signIndata: SignIn): Observable<any> {
    return this.http.post(`${environment.APIEndpoint}/Authenticate`, { body: signIndata.getEmail() + '/' + signIndata.getPassword() })
      .pipe(
        tap(_ => this.isAuthenticated = true),
        catchError(this.handleError<any>('authenticationfailed', []))
      );
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate([''])
  }

  registerUser(registerDate: Register): Observable<any> {
    return this.http.post(`${environment.APIEndpoint}/User`, { body: registerDate })
      .pipe(
        tap(_ => this.isAuthenticated = true),
        catchError(this.handleError<any>('authenticationfailed', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
