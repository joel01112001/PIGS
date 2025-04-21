import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { RouterLink, RouterLinkActive, Router } from '@angular/router'; // Router importado correctamente
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],  // Router no se importa en imports, solo en el constructor
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <a routerLink="/">Whileaway</a>
      </div>
      <div class="nav-links">
        <a routerLink="/search" routerLinkActive="active">Search</a>
        <a routerLink="/offers" routerLinkActive="active">My Offers</a>

        <ng-container *ngIf="user; else guestLinks">
          <span (click)="goToProfile()">
            {{ firstName || user?.name }}
          </span>
          <a href="javascript:void(0);" (click)="logout()">Logout</a>
        </ng-container>



        <ng-template #guestLinks>
          <a routerLink="/profile" routerLinkActive="active">Profile</a>
          <a routerLink="/login" routerLinkActive="active">Login</a>
        </ng-template>
      </div>
    </nav>
  `,
  styles: [
    `.navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background-color: #f8f9fa; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
     .nav-brand a { font-size: 1.5rem; font-weight: bold; color: #007bff; text-decoration: none; }
     .nav-brand span { font-size: 1.5rem; font-weight: bold; color: #007bff; text-decoration: none; }
     .nav-links { display: flex; gap: 1.5rem; }
     .nav-links a { color: #333; text-decoration: none; padding: 0.5rem; }
     .nav-links a.active { color: #007bff; font-weight: bold; }
     .nav-links span { color: #333; text-decoration: none; padding: 0.5rem; }
     .nav-links span.active { color: #007bff; font-weight: bold; }
    `
  ]
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
  }
}