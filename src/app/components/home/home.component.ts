import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home">
      <h1>Welcome to Whileaway</h1>
      <p>Find and offer services in your area</p>
      <div class="cta-buttons">
        <a routerLink="/search" class="btn">Find Services</a>
        <a routerLink="/offers" class="btn">Offer Services</a>
      </div>
    </div>
  `,
  styles: [`
    .home {
      text-align: center;
      padding: 2rem;
    }
    .cta-buttons {
      margin-top: 2rem;
    }
    .btn {
      display: inline-block;
      padding: 0.8rem 1.5rem;
      margin: 0 1rem;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  `]
})
export class HomeComponent {}