import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <a routerLink="/">Whileaway</a>
      </div>
      <div class="nav-links">
        <a routerLink="/search" routerLinkActive="active">Search</a>
        <a routerLink="/offers" routerLinkActive="active">My Offers</a>
        <a routerLink="/profile" routerLinkActive="active">Profile</a>
        <a routerLink="/login" routerLinkActive="active">Login</a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #f8f9fa;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .nav-brand a {
      font-size: 1.5rem;
      font-weight: bold;
      color: #007bff;
      text-decoration: none;
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
    }
    .nav-links a {
      color: #333;
      text-decoration: none;
      padding: 0.5rem;
    }
    .nav-links a.active {
      color: #007bff;
      font-weight: bold;
    }
  `]
})
export class NavComponent {}