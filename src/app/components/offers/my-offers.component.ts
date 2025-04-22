import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgFor} from "@angular/common";
import {Router} from "@angular/router";
import { Offer } from '../../interfaces/Offer';
import { OffersService } from '../../services/offers.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/auth.service'; // Asegúrate de importar el modelo User

@Component({
  selector: 'app-my-offers',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, NgFor],
  templateUrl: `./my-offers.component.html`,
  styleUrl: `./my-offers.component.css`
})
export class MyOffersComponent implements OnInit{
  myOffers: Offer[] = [];
  user = {} as User|null; // Inicializa el usuario como un objeto vacío de tipo User
  constructor(protected offersService: OffersService, protected authService: AuthService, private router: Router) {}

  
  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user; // Obtén los datos del usuario cuando estén disponibles
    });
    const employerId = this.user && this.user.id ? this.user.id : 0;
    this.offersService.getOffers(
      {"employer": employerId}
    ).subscribe((offers) => {this.myOffers = offers});
  }

  edit(offer: Offer): void {
    this.router.navigate(['/offer', "true", offer.id]);
  }
  create(): void {
    this.router.navigate(['/offer', "false", ""]);
  }
  eliminate(offerId: any): void {
    this.offersService.deleteOffer(offerId).subscribe(() => {window.location.reload();});
  }
  
}