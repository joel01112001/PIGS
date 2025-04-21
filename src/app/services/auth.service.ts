import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { sha256 } from 'js-sha256';

export interface User {
  id: number;
  name: string;
  email: string;
  is_employer?: boolean;
  is_employee?: boolean;
  photo_path?: string;
  address?: string;
  phone_number?: string;
  cv?: string;
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
  id: number;  // Solo el ID
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/users'; // URL de la API de usuarios
  private authUrl = 'http://localhost:8000/users/authenticate'; // URL para autenticación
  private USER_KEY = 'loggedInUser';

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem(this.USER_KEY);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  register(user: RegisterData): Observable<any> {
    user.password = sha256(user.password); // Encriptar la contraseña
    return this.http.post<any>(this.apiUrl, user);
  }

  getUserIdFromLocalStorage(): number | null {
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      return user.id;
    }
    return null;
  }

  authenticate(credentials: LoginData): Observable<AuthResponse> {

    credentials.password = sha256(credentials.password);  // Encriptar la contraseña

    return this.http.post<AuthResponse>(this.authUrl, credentials).pipe(
      tap((response) => {
        if (response.authenticated === 1) {
          const userId = response.id;
          this.fetchUserDetails(userId);  // Llamar a la función para obtener los detalles completos del usuario
        }
      })
    );
  }

  fetchUserDetails(userId: number): void {
    this.http.get<User>(`${this.apiUrl}/${userId}`).subscribe({
      next: (userData) => {
        console.log('Datos del usuario:', userData);
        // Guardamos los datos completos del usuario en el localStorage
        this.setUser(userData);
      },
      error: (error) => {
        console.error('Error al obtener los detalles del usuario:', error);
      },
    });
  }

  setUser(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getUserId(): number | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.id : null;
  }
  getUserInfo(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }


  getCurrentUser(): User | null {
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      return JSON.parse(storedUser); // Devolvemos el objeto usuario guardado en localStorage
    }
    return null;
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }
}
