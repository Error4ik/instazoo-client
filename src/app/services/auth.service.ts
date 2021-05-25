import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:9920/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  loginUser(user: any): Observable<any> {
    return this.httpClient.post(AUTH_API + 'signin', {
      username: user.username,
      password: user.password
    });
  }

  registerUser(user: any): Observable<any> {
    return this.httpClient.post(AUTH_API + 'signup', {
      email: user.email,
      name: user.name,
      username: user.username,
      surname: user.surname,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }
}
