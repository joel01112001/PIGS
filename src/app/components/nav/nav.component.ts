import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { RouterLink, RouterLinkActive, Router } from '@angular/router'; // Router importado correctamente
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],  // Router no se importa en imports, solo en el constructor
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavbarComponent {
  user: User | null = null; // Propiedad para el usuario
  firstName: string | null = null;

  constructor(private authService: AuthService, private router: Router) { 
    // Inyección de dependencias: authService para gestionar el usuario y router para redirigir
    this.authService.currentUser$.subscribe(user => {
      this.user = user; // Cuando se recibe un usuario, se asigna a la propiedad user
      this.firstName = user?.name ? user.name.split(' ')[0] : null;
    });
  }

  // Método para navegar al perfil del usuario
  goToProfile() {
    if (this.user?.id) {
      this.router.navigate([`/profile`]); // Redirige al perfil usando el id del usuario
    }
  }
  

  logout() {
    this.authService.logout(); // Llama al servicio de logout para cerrar sesión
    this.router.navigate(['']); // Redirige a la página de login
  }
}