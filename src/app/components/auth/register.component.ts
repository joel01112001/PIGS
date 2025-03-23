import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



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
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const formData: RegisterData = {
        name: this.registerForm.value.name || '',
        email: this.registerForm.value.email || '',
        password: this.registerForm.value.password || '',
        role: this.registerForm.value.role || '',
        address: this.registerForm.value.address || '',
        phoneNumber: this.registerForm.value.phoneNumber || ''
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
    }
  }
}
