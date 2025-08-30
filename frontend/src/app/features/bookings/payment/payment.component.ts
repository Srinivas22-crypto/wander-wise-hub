import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  isDarkMode = false;
  selectedPaymentMethod = 'credit-card';
  
  // Form data
  cardNumber = '1234 5678 9012 3456';
  expiryDate = 'MM/YY';
  cvv = '123';
  nameOnCard = 'John Doe';
  
  // Billing address
  address = '123 Main St';
  city = 'New York';
  state = 'NY';
  zipCode = '10001';
  country = 'Select country';
  
  // Order summary data - will be populated from query parameters
  orderSummary = {
    flightToDestination: 0,
    hotelBooking: 0,
    travelInsurance: 29.99,
    subtotal: 0,
    taxes: 0,
    total: 0
  };
  
  // Destination details from navigation
  destinationName = '';
  destinationPrice = 0;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
    
    // Get destination and price from query parameters
    this.route.queryParams.subscribe(params => {
      this.destinationName = params['destination'] || 'Unknown Destination';
      this.destinationPrice = parseFloat(params['price']) || 0;
      
      // Calculate order summary based on destination price
      this.calculateOrderSummary();
    });
  }
  
  private calculateOrderSummary() {
    // Use destination price as base price for the trip
    this.orderSummary.flightToDestination = this.destinationPrice * 0.6; // 60% for flight
    this.orderSummary.hotelBooking = this.destinationPrice * 0.4; // 40% for hotel
    this.orderSummary.travelInsurance = 29.99; // Fixed insurance cost
    
    this.orderSummary.subtotal = this.orderSummary.flightToDestination + 
                                 this.orderSummary.hotelBooking + 
                                 this.orderSummary.travelInsurance;
    
    this.orderSummary.taxes = this.orderSummary.subtotal * 0.1; // 10% tax
    this.orderSummary.total = this.orderSummary.subtotal + this.orderSummary.taxes;
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  processPayment() {
    // Here you would integrate with actual payment processing
    console.log('Processing payment...', {
      method: this.selectedPaymentMethod,
      amount: this.orderSummary.total
    });
    
    // For demo purposes, show success and redirect
    alert('Payment processed successfully!');
    this.router.navigate(['/bookings/overview']);
  }

  goBack() {
    window.history.back();
  }
}
