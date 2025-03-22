import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app/app.routes';
import { NavComponent } from './app/components/nav/nav.component';
import {Offer} from './app/interfaces/Offer';
import {OffersService} from './app/services/offers.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  template: `
    <app-nav></app-nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      padding: 1rem;
    }
  `]
})
export class App {
  name = 'Whileaway';
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));