import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgFor} from "@angular/common";
import {Router} from "@angular/router";
import { Offer } from '../../interfaces/Offer';
import { OffersService } from '../../services/offers.service';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, NgFor],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.css"
})
export class SearchComponent {
  constructor(protected offersService: OffersService) {}
  searchQuery = '';
  selectedCategory = '';
  selectedLocation = '';
  searchResults: Offer[] = [];
  selectedSalary: number = 0;



  search() {
    this.offersService.getOffers({}).subscribe((offers) => {this.searchResults = offers});
    console.log(this.searchResults)
  }
}