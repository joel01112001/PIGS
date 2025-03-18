import { Component } from '@angular/core';

@Component({
  selector: 'app-my-offers',
  standalone: true,
  template: `
    <div class="offers-container">
      <div class="offers-header">
        <h2>My Offers</h2>
        <button class="new-offer-btn">Create New Offer</button>
      </div>
      <div class="offers-list">
        <div class="offer-card" *ngFor="let offer of myOffers">
          <div class="offer-header">
            <h3>{{offer.title}}</h3>
            <span class="status" [class.active]="offer.active">
              {{offer.active ? 'Active' : 'Inactive'}}
            </span>
          </div>
          <p>{{offer.description}}</p>
          <div class="offer-details">
            <span>Price: {{offer.price}}</span>
            <span>Category: {{offer.category}}</span>
          </div>
          <div class="offer-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .offers-container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .offers-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .new-offer-btn {
      padding: 0.5rem 1rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .offer-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .offer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .status {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.9rem;
    }
    .status.active {
      background-color: #28a745;
      color: white;
    }
    .offer-details {
      display: flex;
      gap: 2rem;
      margin: 1rem 0;
    }
    .offer-actions {
      display: flex;
      gap: 1rem;
    }
    .edit-btn, .delete-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .edit-btn {
      background-color: #007bff;
      color: white;
    }
    .delete-btn {
      background-color: #dc3545;
      color: white;
    }
  `]
})
export class MyOffersComponent {
  myOffers = [
    {
      title: 'House Cleaning Service',
      description: 'Professional house cleaning service available on weekends',
      price: '$25/hour',
      category: 'Cleaning',
      active: true
    },
    {
      title: 'Math Tutoring',
      description: 'Private math tutoring for high school students',
      price: '$40/hour',
      category: 'Education',
      active: false
    }
  ];
}