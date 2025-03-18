import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-container">
      <div class="search-header">
        <h2>Search Services</h2>
        <div class="search-box">
          <input type="text" [(ngModel)]="searchQuery" placeholder="Search for services...">
          <button (click)="search()">Search</button>
        </div>
        <div class="filters">
          <select [(ngModel)]="selectedCategory">
            <option value="">All Categories</option>
            <option value="cleaning">Cleaning</option>
            <option value="gardening">Gardening</option>
            <option value="tutoring">Tutoring</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <select [(ngModel)]="selectedLocation">
            <option value="">All Locations</option>
            <option value="new-york">New York</option>
            <option value="los-angeles">Los Angeles</option>
            <option value="chicago">Chicago</option>
          </select>
        </div>
      </div>
      <div class="search-results">
        <p *ngIf="!searchResults.length">No services found. Try adjusting your search criteria.</p>
        <div class="service-card" *ngFor="let service of searchResults">
          <h3>{{service.title}}</h3>
          <p>{{service.description}}</p>
          <div class="service-footer">
            <span>{{service.price}}</span>
            <button>Contact Provider</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .search-header {
      margin-bottom: 2rem;
    }
    .search-box {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
    }
    .search-box input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .search-box button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .filters {
      display: flex;
      gap: 1rem;
    }
    .filters select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .service-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .service-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }
  `]
})
export class SearchComponent {
  searchQuery = '';
  selectedCategory = '';
  selectedLocation = '';
  searchResults: any[] = [];

  search() {
    // Implement search logic here
    console.log('Searching:', {
      query: this.searchQuery,
      category: this.selectedCategory,
      location: this.selectedLocation
    });
  }
}