import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService, User } from '../../../../core/services/auth.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { TranslationService, Language } from '../../../../core/services/translation.service';
import { NavigationMenuComponent, NavigationItem } from '../../ui/navigation-menu/navigation-menu.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavigationMenuComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  isDarkMode$: Observable<boolean>;
  searchQuery = '';
  isUserMenuOpen = false;
  isMobileMenuOpen = false;
  isSearchExpanded = false;
  activeDropdown: string | null = null;
  notificationCount = 3;
  selectedLanguage = 'en';
  isNotificationsOpen = false;
  isLanguageDropdownOpen = false;
  defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2ZjEiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTggMzJjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';

  languages: Language[] = [];

  notifications: any[] = [];

  navigationItems: NavigationItem[] = [];

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private translationService: TranslationService
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isDarkMode$ = this.themeService.isDarkMode$;
    this.languages = this.translationService.supportedLanguages;
  }

  ngOnInit(): void {
    this.translationService.currentLanguage$.subscribe(lang => {
      this.selectedLanguage = lang;
      this.updateNotifications();
      this.updateNavigationItems();
    });
    this.updateNotifications();
    this.updateNavigationItems();
  }

  private updateNotifications(): void {
    this.notifications = [
      {
        id: 1,
        type: 'booking',
        title: this.translationService.getInstantTranslation('NOTIFICATIONS.FLIGHT_BOOKING_CONFIRMED'),
        message: this.translationService.getInstantTranslation('NOTIFICATIONS.FLIGHT_BOOKING_MESSAGE'),
        time: '36m ago'
      },
      {
        id: 2,
        type: 'reminder',
        title: this.translationService.getInstantTranslation('NOTIFICATIONS.CHECK_IN_REMINDER'),
        message: this.translationService.getInstantTranslation('NOTIFICATIONS.CHECK_IN_MESSAGE'),
        time: '2h ago'
      },
      {
        id: 3,
        type: 'offer',
        title: this.translationService.getInstantTranslation('NOTIFICATIONS.SPECIAL_HOTEL_DEAL'),
        message: this.translationService.getInstantTranslation('NOTIFICATIONS.HOTEL_DEAL_MESSAGE'),
        time: '4h ago'
      }
    ];
    this.notificationCount = this.notifications.length;
  }

  private updateNavigationItems(): void {
    this.navigationItems = [
      {
        label: this.translationService.getInstantTranslation('NAVIGATION.EXPLORE'),
        icon: '📍',
        children: [
          {
            label: this.translationService.getInstantTranslation('NAVIGATION.DESTINATIONS'),
            href: '/explore',
            icon: '🌍',
            description: 'Discover amazing places'
          },
          {
            label: this.translationService.getInstantTranslation('NAVIGATION.EXPERIENCES'),
            href: '/explore',
            icon: '🎯',
            description: 'Unique activities'
          },
          {
            label: this.translationService.getInstantTranslation('NAVIGATION.TRAVEL_GUIDES'),
            href: '/explore',
            icon: '📖',
            description: 'Expert recommendations'
          }
        ]
      },
      {
        label: this.translationService.getInstantTranslation('NAVIGATION.BOOK'),
        icon: '📅',
        children: [
          {
            label: this.translationService.getInstantTranslation('NAVIGATION.FLIGHTS'),
            href: '/bookings/flights',
            icon: '✈️',
            description: 'Find the best deals'
          },
          {
            label: this.translationService.getInstantTranslation('NAVIGATION.HOTELS'),
            href: '/bookings/hotels',
            icon: '🏨',
            description: 'Book your stay'
          },
          {
            label: this.translationService.getInstantTranslation('NAVIGATION.CAR_RENTAL'),
            href: '/bookings/cars',
            icon: '🚗',
            description: 'Rent a vehicle'
          }
        ]
      },
      {
        label: this.translationService.getInstantTranslation('NAVIGATION.COMMUNITY'),
        href: '/community',
        icon: '👥'
      }
    ];
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', this.searchQuery);
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) {
      this.isNotificationsOpen = false;
      this.isLanguageDropdownOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleSearch(): void {
    this.isSearchExpanded = !this.isSearchExpanded;
    if (this.isSearchExpanded) {
      setTimeout(() => {
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  }

  onSearchBlur(): void {
    if (!this.searchQuery.trim()) {
      this.isSearchExpanded = false;
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.isSearchExpanded = false;
  }

  showDropdown(dropdown: string): void {
    this.activeDropdown = dropdown;
  }

  hideDropdown(dropdown: string): void {
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null;
    }
  }

  onLanguageChange(): void {
    this.translationService.setLanguage(this.selectedLanguage);
  }

  onNavigationItemClick(item: NavigationItem): void {
    console.log('Navigation item clicked:', item);
  }

  logout(): void {
    this.authService.logout();
    this.isUserMenuOpen = false;
  }

  toggleNotifications(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    if (this.isNotificationsOpen) {
      this.isLanguageDropdownOpen = false;
      this.isUserMenuOpen = false;
    }
  }

  toggleLanguageDropdown(): void {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
    if (this.isLanguageDropdownOpen) {
      this.isNotificationsOpen = false;
      this.isUserMenuOpen = false;
    }
  }

  selectLanguage(langCode: string): void {
    this.translationService.setLanguage(langCode);
    this.isLanguageDropdownOpen = false;
  }

  getCurrentLanguageFlag(): string {
    const lang = this.languages.find(l => l.code === this.selectedLanguage);
    return lang ? lang.flag : '🇺🇸';
  }

  getCurrentLanguageName(): string {
    const lang = this.languages.find(l => l.code === this.selectedLanguage);
    return lang ? lang.name : 'English';
  }

  markAllAsRead(): void {
    this.notifications = [];
    this.notificationCount = 0;
  }

  dismissNotification(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notificationCount = this.notifications.length;
  }

  getUserAvatar(): string {
    const user = this.authService.getCurrentUser();
    return user?.avatar || this.defaultAvatar;
  }

  onAvatarError(event: any): void {
    event.target.src = this.defaultAvatar;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    
    // Close notifications dropdown if clicking outside
    if (this.isNotificationsOpen && !target.closest('.notification-dropdown')) {
      this.isNotificationsOpen = false;
    }
    
    // Close language dropdown if clicking outside
    if (this.isLanguageDropdownOpen && !target.closest('.language-dropdown')) {
      this.isLanguageDropdownOpen = false;
    }
    
    // Close user menu if clicking outside
    if (this.isUserMenuOpen && !target.closest('.user-menu')) {
      this.isUserMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.isNotificationsOpen = false;
    this.isLanguageDropdownOpen = false;
    this.isUserMenuOpen = false;
  }
}
