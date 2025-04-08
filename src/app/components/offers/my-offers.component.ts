import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgFor} from "@angular/common";
import {Router} from "@angular/router";
import { Offer } from '../../interfaces/Offer';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-my-offers',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, NgFor],
  templateUrl: `./my-offers.component.html`,
  styleUrl: `./my-offers.component.css`
})
export class MyOffersComponent implements OnInit{
  myOffers: Offer[] = [];
  user = JSON.parse(localStorage.getItem('loggedInUser') || '{}').id;
  constructor(protected offersService: OffersService, private router: Router) {}

  
  ngOnInit(): void {
    this.offersService.getOffers(
      {"employer": this.user}
    ).subscribe((offers) => {this.myOffers = offers});
  }

  edit(offer: Offer): void {
    this.router.navigate(['/offer', true, offer.id]);
  }
  create(): void {
    this.router.navigate(['/offer', false, ""]);
  }
  eliminate(offerId: any): void {
    this.offersService.deleteOffer(offerId).subscribe(() => {});
  }
  
}