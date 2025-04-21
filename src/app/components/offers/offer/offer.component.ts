import { Offer } from '../../../interfaces/Offer';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgFor} from "@angular/common";
import {Router} from "@angular/router";
import { OffersService } from '../../../services/offers.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  imports: [FormsModule, NgForOf, NgIf, NgFor],
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit{
  @Input() isEditMode: boolean = false;
  @Input() offerId!: number | null;
  offer: Offer = {
    id: null,
    title: '',
    additional_info: '',
    employer: 0,
    price: 0,
    address: '',
    category: ''
  };
  constructor(protected offersService: OffersService, protected authService: AuthService,private router: Router) {}
  categories: string[] = [];
  tags: string[] = [];
  prices: number[] = [];
  ngOnInit(): void {
    if (this.isEditMode) {
      this.offersService.getOffer(this.offerId!).subscribe((offer) => this.offer = offer);
    }
    this.offersService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.offersService.getTags().subscribe((tags) => {
      this.tags = tags;
    });

    this.offersService.getPrices().subscribe((prices) => {
      this.prices = prices;
    });
    this.offer.employer = this.authService.getUserIdFromLocalStorage(); // Asignar el ID del usuario autenticado a la oferta
  }
  submitForm() {
    if (this.isEditMode) {
      this.offersService.updateOffer(this.offer).subscribe({
        next: () => {
          console.log('Oferta actualizada con éxito');
          this.router.navigate(['/offers']);
        },
        error: (err) => console.error('Error al actualizar la oferta:', err)
      });
    } else {
      this.offersService.createOffer(this.offer).subscribe({
        next: () => {
          console.log('Nueva oferta creada con éxito');
          this.router.navigate(['/offers']);
        },
        error: (err) => console.error('Error al crear la oferta:', err)
      });
    }
  }
}
