import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  // Otros campos que puedas necesitar, como foto, teléfono, etc.
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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
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
            // Si la autenticación es exitosa, obtenemos el ID del usuario
            const userId = response.id;

            // Llamamos a la API para obtener la información del usuario
            this.authService.getUserInfo(userId).subscribe({
              next: (userData) => {
                // Ahora tenemos los datos completos del usuario
                const localUser: User = {
                  id: userData.id,
                  name: userData.name,
                  email: userData.email,
                  // Puedes agregar más campos aquí según la respuesta del servidor
                };

                // Guardamos el usuario completo en localStorage
                localStorage.setItem('loggedInUser', JSON.stringify(localUser));

                // También puedes usar el servicio AuthService para gestionar el usuario
                this.authService.setUser(localUser);

                // Navegar a la página de dashboard
                this.router.navigate(['/dashboard']);
              },
              
            });
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