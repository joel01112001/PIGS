import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgStyle, NgSwitch, NgSwitchCase} from "@angular/common";
import {Router} from "@angular/router";
import { Offer } from '../../interfaces/Offer';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,NgClass, NgForOf, NgIf, NgStyle, NgSwitch, NgSwitchCase],
  templateUrl: "./search.component.html",
  styleUrl: "./search.component.css"
})
export class SearchComponent {
  searchQuery = '';
  selectedCategory = '';
  selectedLocation = '';
  searchResults: Offer[] = [];
  selectedSalary: number = 0;

  search() {
    this.searchResults = [
      new Offer(), 
      new Offer(), 
      new Offer()];
  }
}