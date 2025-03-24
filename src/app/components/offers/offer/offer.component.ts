import { Offer } from '../../../interfaces/Offer';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgFor} from "@angular/common";
import {Router} from "@angular/router";
import { OffersService } from '../../../services/offers.service';

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
  constructor(protected offersService: OffersService, private router: Router) {}

  ngOnInit(): void {
    if (this.isEditMode) {
      this.offersService.getOffer(this.offerId!).subscribe((offer) => this.offer = offer);
    }
  }

  submitForm() {
    if (this.isEditMode) {
      console.log('Actualizando oferta:', this.offer);
    } else {
      console.log('Creando nueva oferta:', this.offer);
    }
  }
}
