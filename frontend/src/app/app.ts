import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { AuthService } from './core/services/auth.service';
import { TranslationService } from './core/services/translation.service';
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { FooterComponent } from './shared/components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TravelApp';
  isDarkMode = false;

  constructor(
    public themeService: ThemeService,
    private authService: AuthService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.themeService.initializeTheme();
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
    
    // Initialize translation service
    this.translationService.getCurrentLanguage();
    
    // Force auth service initialization
    console.log('App initialized, auth service loaded');
  }
}
