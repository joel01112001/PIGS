import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
  address: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/)
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9\s\-+]{9,}$/)
    ])
  }, { validators: [RegisterComponent.passwordsMatchValidator] });

  constructor(private authService: AuthService, private router: Router) {}

  static passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordsMismatch: true }
      : null;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.valid) {
      const { name, email, password, role, address, phoneNumber } = this.registerForm.value;

      const formData: RegisterData = {
        name: name || '',
        email: email || '',
        password: password || '',
        role: role || '',
        address: address || '',
        phoneNumber: phoneNumber || ''
      };

      this.authService.register(formData).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error registering user', error);
        }
      });
    } else {
      this.markFormAsTouched();
    }
  }

  private markFormAsTouched() {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  controlInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && (control.touched || this.submitted));
  }
}
