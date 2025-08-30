import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-destination-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination-detail.component.html',
  styleUrl: './destination-detail.component.css'
})
export class DestinationDetailComponent implements OnInit {
  destinationId: string | null = null;
  isDarkMode = false;
  
  destination = {
    id: '1',
    name: 'Paris, France',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800',
    description: 'Experience the magic of Paris, the City of Light. From the iconic Eiffel Tower to the charming streets of Montmartre, Paris offers an unforgettable blend of history, culture, and romance.',
    rating: 4.8,
    reviewsCount: 2847,
    price: 299,
    bestTime: 'April - October',
    language: 'French',
    currency: 'Euro (EUR)',
    timezone: 'CET (UTC+1)',
    weather: {
      temperature: 22,
      description: 'partly cloudy'
    },
    highlights: [
      {
        icon: '🗼',
        title: 'Eiffel Tower',
        description: 'Iconic iron lattice tower and symbol of Paris'
      },
      {
        icon: '🎨',
        title: 'Louvre Museum',
        description: 'World\'s largest art museum and historic monument'
      },
      {
        icon: '⛪',
        title: 'Notre-Dame Cathedral',
        description: 'Medieval Catholic cathedral and architectural masterpiece'
      },
      {
        icon: '🌟',
        title: 'Champs-Élysées',
        description: 'Famous avenue for shopping and entertainment'
      }
    ],
    activities: [
      {
        name: 'Seine River Cruise',
        price: 25,
        image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=300'
      },
      {
        name: 'Louvre Museum Tour',
        price: 45,
        image: 'https://images.unsplash.com/photo-1566139884456-8c0c4e5b3c5f?w=300'
      },
      {
        name: 'Montmartre Walking Tour',
        price: 35,
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300'
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.destinationId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  bookNow() {
    this.router.navigate(['/bookings/payment'], {
      queryParams: {
        destination: this.destination.name,
        price: this.destination.price
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
