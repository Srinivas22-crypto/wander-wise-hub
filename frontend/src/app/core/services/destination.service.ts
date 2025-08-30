import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ApiService, ApiResponse } from './api.service';

export interface Destination {
  _id: string;
  name: string;
  description: string;
  country: string;
  city?: string;
  category: 'beach' | 'mountain' | 'city' | 'cultural' | 'adventure' | 'relaxation';
  images: string[];
  coordinates: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  averageRating: number;
  totalReviews: number;
  popularActivities: string[];
  bestTimeToVisit: string;
  estimatedBudget: {
    budget: number;
    luxury: number;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private destinationsSubject = new BehaviorSubject<Destination[]>([]);
  public destinations$ = this.destinationsSubject.asObservable();

  constructor(private apiService: ApiService) {}

  /**
   * Get all destinations
   */
  getDestinations(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
    sort?: string;
  }): Observable<Destination[]> {
    console.log('🔄 Fetching destinations from API with params:', params);
    
    return this.apiService.get<any>('/destinations', params).pipe(
      map((response: any) => {
        console.log('✅ API Response received:', response);
        
        // Handle different response formats
        let destinations: Destination[] = [];
        
        if (response && response.success && response.data) {
          destinations = Array.isArray(response.data) ? response.data : [response.data];
          console.log(`📍 Found ${destinations.length} destinations from API`);
        } else if (Array.isArray(response)) {
          destinations = response;
          console.log(`📍 Found ${destinations.length} destinations (direct array)`);
        } else {
          console.warn('⚠️ Unexpected API response format:', response);
          throw new Error('Invalid API response format');
        }
        
        // Apply client-side filtering if backend doesn't support it
        if (params?.category && params.category !== 'all') {
          destinations = destinations.filter(d => d.category === params.category);
          console.log(`🔍 Filtered by category '${params.category}': ${destinations.length} destinations`);
        }
        if (params?.search) {
          const searchTerm = params.search.toLowerCase();
          destinations = destinations.filter(d => 
            d.name.toLowerCase().includes(searchTerm) ||
            d.description.toLowerCase().includes(searchTerm) ||
            d.country.toLowerCase().includes(searchTerm) ||
            d.city?.toLowerCase().includes(searchTerm)
          );
          console.log(`🔍 Filtered by search '${params.search}': ${destinations.length} destinations`);
        }
        
        this.destinationsSubject.next(destinations);
        return destinations;
      }),
      catchError((error) => {
        console.error('❌ API Error details:', {
          message: error.message,
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          error: error
        });
        
        // Only fall back to mock data if it's a connection error
        if (error.status === 0 || error.status >= 500) {
          console.log('🔄 Connection error detected, falling back to mock data');
          const mockData = this.getMockDestinations();
          
          // Apply same filtering to mock data
          let filteredMockData = mockData;
          if (params?.category && params.category !== 'all') {
            filteredMockData = filteredMockData.filter(d => d.category === params.category);
          }
          if (params?.search) {
            const searchTerm = params.search.toLowerCase();
            filteredMockData = filteredMockData.filter(d => 
              d.name.toLowerCase().includes(searchTerm) ||
              d.description.toLowerCase().includes(searchTerm) ||
              d.country.toLowerCase().includes(searchTerm) ||
              d.city?.toLowerCase().includes(searchTerm)
            );
          }
          
          this.destinationsSubject.next(filteredMockData);
          return of(filteredMockData);
        } else {
          // For other errors (4xx), don't fall back to mock data
          console.error('🚫 API error (not connection issue):', error);
          throw error;
        }
      })
    );
  }

  /**
   * Get destination by ID
   */
  getDestinationById(id: string): Observable<Destination | null> {
    return this.apiService.get<any>(`/destinations/${id}`).pipe(
      map((response: any) => {
        if (response && response.success && response.data) {
          return response.data;
        } else if (response && !response.success) {
          console.warn('API returned unsuccessful response:', response);
          return null;
        } else if (response && response._id) {
          // Direct destination object
          return response;
        }
        return null;
      }),
      catchError((error) => {
        console.error('Error fetching destination from API:', error);
        console.log('Falling back to mock data for ID:', id);
        // Try to find in mock data as fallback
        const mockDestinations = this.getMockDestinations();
        const destination = mockDestinations.find(d => 
          d._id === id || 
          d.name.toLowerCase().includes(id.toLowerCase()) ||
          d.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(id.toLowerCase().replace(/[^a-z0-9]/g, ''))
        );
        return of(destination || null);
      })
    );
  }

  /**
   * Get destination by name/slug
   */
  getDestinationBySlug(slug: string): Observable<Destination | null> {
    // First try to get by ID, then by name matching
    return this.getDestinationById(slug).pipe(
      switchMap(destination => {
        if (destination) {
          return of(destination);
        }
        
        // If not found by ID, try to get all destinations and find by name
        return this.getDestinations().pipe(
          map(destinations => {
            const slugName = slug.toLowerCase().replace(/[-_]/g, ' ');
            return destinations.find(d => 
              d.name.toLowerCase().includes(slugName) ||
              d.country.toLowerCase().includes(slugName) ||
              d.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(slug.toLowerCase().replace(/[^a-z0-9]/g, ''))
            ) || null;
          })
        );
      })
    );
  }

  /**
   * Get featured destinations
   */
  getFeaturedDestinations(): Observable<Destination[]> {
    return this.getDestinations().pipe(
      map(destinations => destinations.filter(d => d.averageRating >= 4.7).slice(0, 6))
    );
  }

  /**
   * Search destinations
   */
  searchDestinations(query: string, category?: string): Observable<Destination[]> {
    return this.getDestinations({ search: query, category });
  }

  /**
   * Get destinations by category
   */
  getDestinationsByCategory(category: string): Observable<Destination[]> {
    return this.getDestinations({ category });
  }

  /**
   * Mock data for fallback when backend is not available
   */
  private getMockDestinations(): Destination[] {
    const destinationsData = [
      {
        name: "Bali",
        description: "Indonesia's tropical paradise known for its stunning beaches, lush rice terraces, ancient temples, and vibrant culture. Perfect for relaxation and spiritual experiences.",
        country: "Indonesia",
        city: "Bali",
        category: "beach",
        images: [
          "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2"
        ],
        coordinates: {
          type: "Point",
          coordinates: [115.1889, -8.4095]
        },
        averageRating: 4.6,
        totalReviews: 534,
        popularActivities: ["Beach Activities", "Temple Visits", "Surfing", "Spa Treatments", "Rice Terrace Tours"],
        bestTimeToVisit: "April to October for dry season",
        estimatedBudget: {
          budget: 80,
          luxury: 2000
        },
        isActive: true
      },
      {
        name: "Santorini",
        description: "A stunning Greek island famous for its white-washed buildings, blue-domed churches, dramatic cliffs, and breathtaking sunsets over the Aegean Sea.",
        country: "Greece",
        city: "Santorini",
        category: "beach",
        images: [
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf"
        ],
        coordinates: {
          type: "Point",
          coordinates: [25.4615, 36.3932]
        },
        averageRating: 4.9,
        totalReviews: 423,
        popularActivities: ["Sunset Viewing", "Beach Activities", "Wine Tasting", "Boat Tours", "Village Exploration"],
        bestTimeToVisit: "April to October for warm weather and swimming",
        estimatedBudget: {
          budget: 180,
          luxury: 3000
        },
        isActive: true
      },
      {
        name: "New York City",
        description: "The Big Apple, a bustling metropolis known for its iconic skyline, Broadway shows, world-class museums, diverse neighborhoods, and vibrant energy.",
        country: "United States",
        city: "New York",
        category: "city",
        images: [
          "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
          "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7"
        ],
        coordinates: {
          type: "Point",
          coordinates: [-74.0060, 40.7128]
        },
        averageRating: 4.3,
        totalReviews: 687,
        popularActivities: ["Broadway Shows", "Museum Visits", "Shopping", "Statue of Liberty", "Central Park"],
        bestTimeToVisit: "April to June and September to November for pleasant weather",
        estimatedBudget: {
          budget: 200,
          luxury: 3200
        },
        isActive: true
      },
      {
        name: "Swiss Alps",
        description: "Majestic mountain range offering breathtaking landscapes, pristine lakes, charming villages, and world-class skiing. Perfect for adventure and nature lovers.",
        country: "Switzerland",
        city: "Zermatt",
        category: "mountain",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
        ],
        coordinates: {
          type: "Point",
          coordinates: [8.2275, 46.8017]
        },
        averageRating: 4.8,
        totalReviews: 278,
        popularActivities: ["Skiing", "Hiking", "Mountain Climbing", "Scenic Train Rides", "Lake Tours"],
        bestTimeToVisit: "December to March for skiing, June to September for hiking",
        estimatedBudget: {
          budget: 250,
          luxury: 4000
        },
        isActive: true
      },
      {
        name: "Rome",
        description: "The Eternal City, rich in history and culture with ancient ruins, magnificent architecture, world-renowned art, and incredible Italian cuisine.",
        country: "Italy",
        city: "Rome",
        category: "cultural",
        images: [
          "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2"
        ],
        coordinates: {
          type: "Point",
          coordinates: [12.4964, 41.9028]
        },
        averageRating: 4.6,
        totalReviews: 412,
        popularActivities: ["Colosseum Tour", "Vatican Museums", "Historic Site Visits", "Food Tours", "Piazza Exploration"],
        bestTimeToVisit: "April to May and September to October for mild weather",
        estimatedBudget: {
          budget: 130,
          luxury: 2500
        },
        isActive: true
      },
      {
        name: "Machu Picchu",
        description: "Ancient Inca citadel perched high in the Andes Mountains. A UNESCO World Heritage site offering incredible history, stunning views, and spiritual experiences.",
        country: "Peru",
        city: "Cusco",
        category: "cultural",
        images: [
          "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
          "https://images.unsplash.com/photo-1526392060635-9d6019884377"
        ],
        coordinates: {
          type: "Point",
          coordinates: [-72.5450, -13.1631]
        },
        averageRating: 4.9,
        totalReviews: 289,
        popularActivities: ["Inca Trail Hike", "Ruins Exploration", "Mountain Views", "Cultural Tours", "Sun Gate Visit"],
        bestTimeToVisit: "May to September for dry season",
        estimatedBudget: {
          budget: 100,
          luxury: 1800
        },
        isActive: true
      },
      {
        name: "Dubai",
        description: "A modern metropolis in the desert, known for luxury shopping, ultramodern architecture, vibrant nightlife, and world-class hospitality.",
        country: "United Arab Emirates",
        city: "Dubai",
        category: "city",
        images: [
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
          "https://images.unsplash.com/photo-1542259005000-4cfa2c1feb17"
        ],
        coordinates: {
          type: "Point",
          coordinates: [55.2708, 25.2048]
        },
        averageRating: 4.4,
        totalReviews: 356,
        popularActivities: ["Burj Khalifa Visit", "Desert Safari", "Shopping", "Luxury Dining", "Palm Jumeirah"],
        bestTimeToVisit: "November to March for pleasant temperatures",
        estimatedBudget: {
          budget: 180,
          luxury: 5000
        },
        isActive: true
      },
      {
        name: "Maldives",
        description: "Tropical paradise with crystal-clear waters, pristine white sand beaches, luxury overwater bungalows, and incredible marine life. Perfect for romantic getaways.",
        country: "Maldives",
        city: "Malé",
        category: "beach",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          "https://images.unsplash.com/photo-1500673922987-e212871fec22"
        ],
        coordinates: {
          type: "Point",
          coordinates: [73.5361, 4.1755]
        },
        averageRating: 4.8,
        totalReviews: 267,
        popularActivities: ["Snorkeling", "Diving", "Island Hopping", "Spa Treatments", "Sunset Cruises"],
        bestTimeToVisit: "November to April for dry season",
        estimatedBudget: {
          budget: 300,
          luxury: 6000
        },
        isActive: true
      },
      {
        name: "Tokyo",
        description: "A vibrant metropolis blending traditional culture with cutting-edge technology. Experience ancient temples, modern skyscrapers, incredible cuisine, and unique pop culture.",
        country: "Japan",
        city: "Tokyo",
        category: "city",
        images: [
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
          "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65"
        ],
        coordinates: {
          type: "Point",
          coordinates: [139.6917, 35.6895]
        },
        averageRating: 4.8,
        totalReviews: 324,
        popularActivities: ["Sightseeing", "Shopping", "Cultural Experiences", "Food Tours", "Temple Visits"],
        bestTimeToVisit: "March to May and September to November for mild weather",
        estimatedBudget: {
          budget: 120,
          luxury: 3500
        },
        isActive: true
      },
      {
        name: "Paris",
        description: "The City of Light, known for its art, fashion, gastronomy, and culture. Home to iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
        country: "France",
        city: "Paris",
        category: "city",
        images: [
          "https://images.unsplash.com/photo-1502602898536-47ad22581b52",
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
        ],
        coordinates: {
          type: "Point",
          coordinates: [2.3522, 48.8566]
        },
        averageRating: 4.7,
        totalReviews: 512,
        popularActivities: ["Museum Visits", "Eiffel Tower", "River Cruises", "Culinary Tours", "Shopping"],
        bestTimeToVisit: "April to June and October to November for pleasant weather",
        estimatedBudget: {
          budget: 150,
          luxury: 2500
        },
        isActive: true
      },
      {
        name: "Tuscany",
        description: "Rolling hills, vineyards, and authentic Italian cuisine.",
        country: "Italy",
        city: "Florence",
        category: "cultural",
        images: [
          "https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d",
          "https://images.unsplash.com/photo-1499678329028-101435549a4e"
        ],
        coordinates: {
          type: "Point",
          coordinates: [11.2558, 43.7696]
        },
        averageRating: 4.8,
        totalReviews: 189,
        popularActivities: ["Wine Tasting", "Vineyard Tours", "Cooking Classes", "Historic Site Visits", "Countryside Tours"],
        bestTimeToVisit: "April to May and September to October for mild weather and harvest season",
        estimatedBudget: {
          budget: 130,
          luxury: 2800
        },
        isActive: true
      },
      {
        name: "Costa Rica",
        description: "Rich biodiversity and stunning natural landscapes.",
        country: "Costa Rica",
        city: "San José",
        category: "adventure",
        images: [
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        ],
        coordinates: {
          type: "Point",
          coordinates: [-84.0907, 9.9281]
        },
        averageRating: 4.6,
        totalReviews: 156,
        popularActivities: ["Rainforest Tours", "Wildlife Watching", "Ziplining", "Beach Activities", "Volcano Tours"],
        bestTimeToVisit: "December to April for dry season",
        estimatedBudget: {
          budget: 47,
          luxury: 1500
        },
        isActive: true
      }
    ];

    // Convert to proper Destination format with IDs and timestamps
    return destinationsData.map((dest, index) => ({
      _id: (index + 1).toString(),
      ...dest,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    })) as Destination[];
  }

  /**
   * Test API connection
   */
  testConnection(): Observable<boolean> {
    console.log('🔍 Testing API connection to:', `${(this as any).apiService.baseUrl || 'unknown'}/destinations`);
    
    return this.apiService.get<any>('/destinations?limit=1').pipe(
      map((response) => {
        console.log('✅ Backend API connection successful, response:', response);
        return true;
      }),
      catchError((error) => {
        console.error('❌ Backend API connection failed:', {
          message: error.message,
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          name: error.name
        });
        
        if (error.status === 0) {
          console.error('🚫 CORS or Network Error - Backend may not be running or CORS not configured');
        } else if (error.status === 404) {
          console.error('🚫 API endpoint not found - Check if /api/destinations route exists');
        } else if (error.status >= 500) {
          console.error('🚫 Server Error - Backend may have crashed');
        }
        
        console.log('🔄 Will use mock data instead');
        return of(false);
      })
    );
  }
}
