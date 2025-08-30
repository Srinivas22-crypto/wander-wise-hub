import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isDarkMode = false;
  destinations = [
    {
      id: 1,
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400',
      rating: 4.9,
      price: 299,
      tags: ['Eiffel Tower', 'Louvre Museum', 'Notre Dame']
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
      rating: 4.8,
      price: 399,
      tags: ['Shibuya Crossing', 'Mount Fuji', 'Cherry Blossoms']
    },
    {
      id: 3,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400',
      rating: 4.7,
      price: 249,
      tags: ['Rice Terraces', 'Temples', 'Beaches']
    }
  ];

  stats = [
    {
      icon: '🌍',
      value: '180+',
      label: 'Destinations'
    },
    {
      icon: '👥',
      value: '50K+',
      label: 'Happy Travelers'
    },
    {
      icon: '📸',
      value: '120K+',
      label: '5-Star Reviews'
    },
    {
      icon: '❤️',
      value: '1M+',
      label: 'Memories Created'
    }
  ];

  quickActions = [
    {
      icon: '✈️',
      title: 'Flights',
      description: 'Find the best deals on flights worldwide',
      link: '/bookings/flights'
    },
    {
      icon: '📍',
      title: 'Explore',
      description: 'Discover amazing places to visit',
      link: '/explore'
    },
    {
      icon: '👥',
      title: 'Community',
      description: 'Connect with fellow travelers',
      link: '/community'
    }
  ];

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  bookDestination(destination: any, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/bookings/payment'], {
      queryParams: {
        destination: destination.name,
        price: destination.price
      }
    });
  }
}
