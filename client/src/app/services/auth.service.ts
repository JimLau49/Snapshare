import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/users';
  private token: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/register`, user);
  }

  login(user: User) {
    return this.http.post(`${this.API_URL}/login`, user)
      .pipe(map((response: any) => {
        this.cookieService.set('token', response.token, 7, '/', '', true, 'Strict');
        return response;
      }));
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }
}