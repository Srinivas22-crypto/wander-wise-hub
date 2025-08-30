import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
      <a routerLink="/" class="home-link">Go to Home Page</a>
    </div>
  `,
  styles: [`
    .not-found-container {
      text-align: center;
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 3rem;
      color: #f44336;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #666;
    }
    
    .home-link {
      display: inline-block;
      padding: 0.8rem 1.5rem;
      background-color: #2196F3;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    
    .home-link:hover {
      background-color: #1976D2;
    }
  `]
})
export class NotFoundComponent {}
