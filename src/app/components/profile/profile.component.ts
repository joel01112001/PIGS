import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/auth.service'; // Asegúrate de importar el modelo User

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user; // Obtén los datos del usuario cuando estén disponibles
    });
  }

  editProfile() {
    // Aquí puedes implementar la lógica para redirigir o mostrar un formulario de edición
    console.log('Edit Profile clicked');
  }
}
