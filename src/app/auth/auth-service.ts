import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private token = "auth token";
  login(loginrequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiUrl + '/api/Admin', loginrequest)
    .pipe(tap(response => {
      if (response.success) {
        localStorage.setItem(this.token, response.token);
      }
    }));
  }

  logout() {
    localStorage.removeItem(this.token);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.token) !== null;
  }
}
