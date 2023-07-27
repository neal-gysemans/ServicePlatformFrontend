import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9090/api/auth';

  private userRole: string = "";


  constructor(private http: HttpClient) {
  }

  register(user: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, credentials).pipe(
      map(response => {
        // Store the token in local storage
        localStorage.setItem('access_token', response.token);
        return response;
      })
    );
  }

  logout() {
    // Remove the token from local storage
    localStorage.removeItem('access_token');
  }

  isLoggedIn() {
    // Check if the token exists
    return !!localStorage.getItem('access_token');
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string {
    return this.userRole;
  }

  getUserRoleFromStorage() {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      const decodedToken = this.decodeToken(storedToken);
      return decodedToken?.role || 'GUEST';
    } else {
      return 'GUEST';
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
