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
export class SearchComponent implements OnInit{
  constructor(protected offersService: OffersService) {}
  searchQuery = '';
  selectedCategory = '';
  selectedTags = '';
  searchResults: Offer[] = [];
  selectedSalary: number = 0;
  categories: string[] = [];
  tags: string[] = [];
  prices: number[] = [];

  ngOnInit(): void {
    this.offersService.getCategories().subscribe((categories) => {this.categories = categories});
    this.offersService.getTags().subscribe((tags) => {this.tags = tags});
    this.offersService.getPrices().subscribe((prices) => {this.prices = prices});
  }

  search() {
    this.offersService.getOffers(
      {"category": this.selectedCategory, "tags": this.selectedTags, "price": this.selectedSalary, "title": this.searchQuery}
    ).subscribe((offers) => {this.searchResults = offers});
    console.log(this.searchResults)
  }
}