import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h2>My Profile</h2>
        <button class="edit-btn">Edit Profile</button>
      </div>
      <div class="profile-info">
        <div class="info-group">
          <label>Name</label>
          <p>John Doe</p>
        </div>
        <div class="info-group">
          <label>Email</label>
          <p>johnexample.com</p>
        </div>
        <div class="info-group">
          <label>Location</label>
          <p>New York, NY</p>
        </div>
        <div class="info-group">
          <label>Member Since</label>
          <p>January 2024</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
    }
    .profile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .edit-btn {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .profile-info {
      background-color: #f8f9fa;
      padding: 2rem;
      border-radius: 8px;
    }
    .info-group {
      margin-bottom: 1.5rem;
    }
    .info-group label {
      display: block;
      color: #666;
      margin-bottom: 0.5rem;
    }
    .info-group p {
      margin: 0;
      font-size: 1.1rem;
    }
  `]
})
export class ProfileComponent {}