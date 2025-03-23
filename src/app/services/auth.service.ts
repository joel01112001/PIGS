import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/users';

  constructor(private http: HttpClient) {}

  register(user: RegisterData): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
