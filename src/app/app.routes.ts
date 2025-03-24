import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { MyOffersComponent } from './components/offers/my-offers.component';
import { OfferComponent } from './components/offers/offer/offer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: 'offers', component: MyOffersComponent },
  { path: 'offer/:mode/:id', component: OfferComponent },
  { path: '**', redirectTo: '' }
];