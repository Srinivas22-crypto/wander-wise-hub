import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service';
import { DestinationService, Destination } from '../../core/services/destination.service';

// Using Destination interface from DestinationService
// Added properties for compatibility with existing template
interface ExploreDestination extends Destination {
  id: string;
  image: string;
  price: number;
  featured: boolean;
  rating: number;
}

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  destinations: ExploreDestination[] = [];
  filteredDestinations: ExploreDestination[] = [];
  searchQuery = '';
  selectedCategory = 'all';
  sortBy = 'rating';
  isLoading = false;
  isDarkMode = false;

  categories = [
    { value: 'all', label: 'All Destinations' },
    { value: 'beach', label: 'Beach' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'city', label: 'City' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Culture' },
    { value: 'nature', label: 'Nature' },
    { value: 'food', label: 'Food' }
  ];

  categoryCards = [
    { value: 'all', label: 'All', icon: '🌍' },
    { value: 'adventure', label: 'Adventure', icon: '🏔️' },
    { value: 'beach', label: 'Beach', icon: '🏖️' },
    { value: 'cultural', label: 'Culture', icon: '🏛️' },
    { value: 'food', label: 'Food', icon: '🍽️' },
    { value: 'nature', label: 'Nature', icon: '🌿' },
    { value: 'city', label: 'City', icon: '🏙️' }
  ];

  sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];


  loadDestinations(): void {
    this.isLoading = true;
    
    this.destinationService.getDestinations().subscribe({
      next: (destinations) => {
        // Transform backend destinations to match component interface
        this.destinations = destinations.map(dest => ({
          ...dest,
          id: dest._id,
          image: dest.images[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
          price: dest.estimatedBudget.budget,
          featured: dest.averageRating >= 4.7,
          rating: dest.averageRating
        }));
        
        this.filteredDestinations = [...this.destinations];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading destinations:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applySorting();
  }
  
  applyFilters(): void {
    // Use the destination service for filtering to maintain consistency
    const params: any = {};
    
    if (this.searchQuery) {
      params.search = this.searchQuery;
    }
    
    if (this.selectedCategory && this.selectedCategory !== 'all') {
      params.category = this.selectedCategory;
    }
    
    this.isLoading = true;
    this.destinationService.getDestinations(params).subscribe({
      next: (destinations) => {
        this.filteredDestinations = destinations.map(dest => ({
          ...dest,
          id: dest._id,
          image: dest.images[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
          price: dest.estimatedBudget.budget,
          featured: dest.averageRating >= 4.7,
          rating: dest.averageRating
        }));
        
        this.applySorting();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error filtering destinations:', error);
        this.isLoading = false;
      }
    });
  }

  private applySorting(): void {
    this.filteredDestinations.sort((a, b) => {
      switch (this.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popular':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating;
      }
    });
  }

  getFeaturedDestinations(): ExploreDestination[] {
    return this.destinations.filter(dest => dest.featured).slice(0, 3);
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  getCategoryCount(category: string): number {
    if (category === 'all') {
      return this.destinations.length;
    }
    return this.destinations.filter(dest => dest.category === category).length;
  }

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private destinationService: DestinationService
  ) {}

  ngOnInit(): void {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
    
    // Test API connection first
    this.destinationService.testConnection().subscribe({
      next: (connected) => {
        if (connected) {
          console.log('🌐 API connection successful, loading destinations from backend');
        } else {
          console.log('🔄 API connection failed, will use mock data');
        }
        this.loadDestinations();
      },
      error: (error) => {
        console.error('🚫 Connection test failed:', error);
        this.loadDestinations();
      }
    });
  }

  bookDestination(destination: ExploreDestination, event: Event) {
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
