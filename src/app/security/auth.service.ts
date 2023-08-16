import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9090/api/auth';

  constructor(private http: HttpClient) {
  }

  register(user: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, credentials).pipe(
      map(response => {
        localStorage.setItem('access_token', response.token);
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

  getTokenInformation(){
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      return this.decodeToken(storedToken);
    } else {
      return "No user is logged in!";
    }
  }

  private decodeToken(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}
