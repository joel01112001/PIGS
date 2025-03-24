import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const formData: LoginData = {
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || ''
      };

      this.authService.authenticate(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.authenticated===1) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Incorrect email or password';
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login error:', error);
          this.errorMessage = error.status === 0 ? 
            'Error de conexión con el servidor' : 
            'Error al autenticar';
        }
      });
    } else {
      this.markFormAsTouched();
      this.errorMessage = 'Por favor, complete todos los campos correctamente';
    }
  }

  private markFormAsTouched() {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}