import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DestinationService } from '../../core/services/destination.service';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  selector: 'app-test',
  template: `
    <div class="test-container">
      <h2>API Connection Test</h2>
      <button (click)="testConnection()" class="test-button">
        Test API Connection
      </button>
      
      <div *ngIf="isLoading" class="loading">Loading...</div>
      
      <div *ngIf="error" class="error">
        <h3>Error:</h3>
        <pre>{{ error | json }}</pre>
      </div>
      
      <div *ngIf="data" class="success">
        <h3>Success! Received data:</h3>
        <pre>{{ data | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
      font-family: Arial, sans-serif;
    }
    .test-button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 1rem;
    }
    .test-button:hover {
      background-color: #45a049;
    }
    .loading {
      color: #2196F3;
      margin: 1rem 0;
    }
    .error {
      color: #f44336;
      background-color: #ffebee;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .success {
      color: #4CAF50;
      background-color: #e8f5e9;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
      max-height: 400px;
      overflow-y: auto;
    }
    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
  `]
})
export class TestComponent implements OnInit {
  isLoading = false;
  data: any;
  error: any;

  constructor(private destinationService: DestinationService) {}

  ngOnInit() {
    // Auto-test on component init
    this.testConnection();
  }

  testConnection() {
    this.isLoading = true;
    this.data = null;
    this.error = null;

    console.log('Testing API connection to /destinations');
    
    this.destinationService.getDestinations({ 
      page: 1, 
      limit: 5, 
      sort: '-averageRating' 
    }).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        this.data = response;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('API Error:', err);
        this.error = {
          message: err.message,
          status: err.status,
          error: err.error
        };
        this.isLoading = false;
      }
    });
  }
}
