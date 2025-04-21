import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sha256 } from 'js-sha256';

interface User {
  id: number;
  name: string;
  email: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  authenticated: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/users';
  private authUrl = 'http://localhost:8000/users/authenticate';
  private USER_KEY = 'loggedInUser';


  constructor(private http: HttpClient) {}

  register(user: RegisterData): Observable<any> {
    user.password = sha256(user.password); // Encriptar la contraseña
    return this.http.post<any>(this.apiUrl, user);
  }

  // Nuevo método de autenticación
  authenticate(credentials: LoginData): Observable<AuthResponse> {
    credentials.password = sha256(credentials.password); // Encriptar la contraseña
    return this.http.post<AuthResponse>(this.authUrl, credentials);
  }
  saveUserToLocalStorage(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUserIdFromLocalStorage(): number | null {
    const user = localStorage.getItem(this.USER_KEY);
    if (user) {
      const parsedUser: User = JSON.parse(user);
      return parsedUser.id;
    }
    return null;
  }
}