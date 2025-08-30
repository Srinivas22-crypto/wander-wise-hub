import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  public readonly supportedLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'cn', name: '中文', flag: '🇨🇳' }
  ];

  constructor(private translate: TranslateService) {
    this.initializeTranslation();
  }

  private initializeTranslation(): void {
    // Set available languages
    this.translate.addLangs(this.supportedLanguages.map(lang => lang.code));
    
    // Set default language
    this.translate.setDefaultLang('en');
    
    // Load translations manually since HTTP loader isn't working
    this.loadTranslations();
    
    // Get saved language or detect browser language
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const browserLanguage = this.translate.getBrowserLang();
    const defaultLanguage = savedLanguage || 
      (browserLanguage && this.supportedLanguages.find(lang => lang.code === browserLanguage) ? browserLanguage : 'en');
    
    this.setLanguage(defaultLanguage);
  }

  private loadTranslations(): void {
    // Load English translations directly
    const enTranslations = {
      "HEADER": {
        "BRAND": "TravelHub",
        "TAGLINE": "Your Journey Starts Here",
        "SEARCH_PLACEHOLDER": "Search destinations, hotels, experiences...",
        "NOTIFICATIONS": "Notifications",
        "MARK_ALL_READ": "Mark all read",
        "NO_NOTIFICATIONS": "No new notifications",
        "LANGUAGE": "Language",
        "THEME": "Theme",
        "PROFILE_SETTINGS": "Profile Settings",
        "MY_BOOKINGS": "My Bookings",
        "FAVORITES": "Favorites",
        "LOGOUT": "Logout",
        "SIGN_IN": "Sign In",
        "REGISTER": "Register"
      },
      "NAVIGATION": {
        "HOME": "Home",
        "EXPLORE": "Explore",
        "DESTINATIONS": "Destinations",
        "EXPERIENCES": "Experiences",
        "TRAVEL_GUIDES": "Travel Guides",
        "BOOK": "Book",
        "FLIGHTS": "Flights",
        "HOTELS": "Hotels",
        "CAR_RENTAL": "Car Rental",
        "COMMUNITY": "Community"
      },
      "HOME": {
        "HERO_TITLE": "Discover Your Next",
        "HERO_SUBTITLE": "Adventure",
        "HERO_DESCRIPTION": "Explore amazing destinations, book incredible experiences, and connect with fellow travelers around the world.",
        "START_JOURNEY": "Start Your Journey",
        "COMMUNITY": "Community"
      },
      "NOTIFICATIONS": {
        "FLIGHT_BOOKING_CONFIRMED": "Flight Booking Confirmed",
        "FLIGHT_BOOKING_MESSAGE": "Your flight to Paris has been confirmed for March 15th, 2024",
        "CHECK_IN_REMINDER": "Check-in Reminder",
        "CHECK_IN_MESSAGE": "Don't forget to check-in online for your flight tomorrow",
        "SPECIAL_HOTEL_DEAL": "Special Hotel Deal",
        "HOTEL_DEAL_MESSAGE": "30% off luxury hotels in Rome - Limited time offer!"
      }
    };

    // Set translations for English
    this.translate.setTranslation('en', enTranslations);
    
    // Load other language translations
    this.loadSpanishTranslations();
    this.loadFrenchTranslations();
    this.loadGermanTranslations();
    this.loadItalianTranslations();
    this.loadPortugueseTranslations();
    this.loadJapaneseTranslations();
    this.loadChineseTranslations();
  }

  private loadSpanishTranslations(): void {
    const esTranslations = {
      "HEADER": {
        "BRAND": "TravelHub",
        "TAGLINE": "Tu Viaje Comienza Aquí",
        "SEARCH_PLACEHOLDER": "Buscar destinos, hoteles, experiencias...",
        "NOTIFICATIONS": "Notificaciones",
        "MARK_ALL_READ": "Marcar todo como leído",
        "NO_NOTIFICATIONS": "No hay notificaciones nuevas",
        "LANGUAGE": "Idioma",
        "THEME": "Tema",
        "PROFILE_SETTINGS": "Configuración del Perfil",
        "MY_BOOKINGS": "Mis Reservas",
        "FAVORITES": "Favoritos",
        "LOGOUT": "Cerrar Sesión",
        "SIGN_IN": "Iniciar Sesión",
        "REGISTER": "Registrarse"
      },
      "NAVIGATION": {
        "HOME": "Inicio",
        "EXPLORE": "Explorar",
        "DESTINATIONS": "Destinos",
        "EXPERIENCES": "Experiencias",
        "TRAVEL_GUIDES": "Guías de Viaje",
        "BOOK": "Reservar",
        "FLIGHTS": "Vuelos",
        "HOTELS": "Hoteles",
        "CAR_RENTAL": "Alquiler de Coches",
        "COMMUNITY": "Comunidad"
      },
      "HOME": {
        "HERO_TITLE": "Descubre Tu Próxima",
        "HERO_SUBTITLE": "Aventura",
        "HERO_DESCRIPTION": "Explora destinos increíbles, reserva experiencias únicas y conecta con otros viajeros alrededor del mundo.",
        "START_JOURNEY": "Comienza Tu Viaje",
        "COMMUNITY": "Comunidad"
      },
      "NOTIFICATIONS": {
        "FLIGHT_BOOKING_CONFIRMED": "Reserva de Vuelo Confirmada",
        "FLIGHT_BOOKING_MESSAGE": "Tu vuelo a París ha sido confirmado para el 15 de marzo de 2024",
        "CHECK_IN_REMINDER": "Recordatorio de Check-in",
        "CHECK_IN_MESSAGE": "No olvides hacer el check-in online para tu vuelo de mañana",
        "SPECIAL_HOTEL_DEAL": "Oferta Especial de Hotel",
        "HOTEL_DEAL_MESSAGE": "30% de descuento en hoteles de lujo en Roma - ¡Oferta por tiempo limitado!"
      }
    };
    this.translate.setTranslation('es', esTranslations);
  }

  private loadFrenchTranslations(): void {
    const frTranslations = {
      "HEADER": {
        "BRAND": "TravelHub",
        "TAGLINE": "Votre Voyage Commence Ici",
        "SEARCH_PLACEHOLDER": "Rechercher destinations, hôtels, expériences...",
        "NOTIFICATIONS": "Notifications",
        "MARK_ALL_READ": "Tout marquer comme lu",
        "NO_NOTIFICATIONS": "Aucune nouvelle notification",
        "LANGUAGE": "Langue",
        "THEME": "Thème",
        "PROFILE_SETTINGS": "Paramètres du Profil",
        "MY_BOOKINGS": "Mes Réservations",
        "FAVORITES": "Favoris",
        "LOGOUT": "Déconnexion",
        "SIGN_IN": "Se Connecter",
        "REGISTER": "S'inscrire"
      },
      "NAVIGATION": {
        "HOME": "Accueil",
        "EXPLORE": "Explorer",
        "DESTINATIONS": "Destinations",
        "EXPERIENCES": "Expériences",
        "TRAVEL_GUIDES": "Guides de Voyage",
        "BOOK": "Réserver",
        "FLIGHTS": "Vols",
        "HOTELS": "Hôtels",
        "CAR_RENTAL": "Location de Voiture",
        "COMMUNITY": "Communauté"
      },
      "HOME": {
        "HERO_TITLE": "Découvrez Votre Prochaine",
        "HERO_SUBTITLE": "Aventure",
        "HERO_DESCRIPTION": "Explorez des destinations incroyables, réservez des expériences uniques et connectez-vous avec d'autres voyageurs du monde entier.",
        "START_JOURNEY": "Commencez Votre Voyage",
        "COMMUNITY": "Communauté"
      },
      "NOTIFICATIONS": {
        "FLIGHT_BOOKING_CONFIRMED": "Réservation de Vol Confirmée",
        "FLIGHT_BOOKING_MESSAGE": "Votre vol pour Paris a été confirmé pour le 15 mars 2024",
        "CHECK_IN_REMINDER": "Rappel d'Enregistrement",
        "CHECK_IN_MESSAGE": "N'oubliez pas de vous enregistrer en ligne pour votre vol de demain",
        "SPECIAL_HOTEL_DEAL": "Offre Spéciale Hôtel",
        "HOTEL_DEAL_MESSAGE": "30% de réduction sur les hôtels de luxe à Rome - Offre limitée dans le temps!"
      }
    };
    this.translate.setTranslation('fr', frTranslations);
  }

  private loadGermanTranslations(): void {
    const deTranslations = {
      "HEADER": {
        "BRAND": "TravelHub",
        "TAGLINE": "Ihre Reise Beginnt Hier",
        "SEARCH_PLACEHOLDER": "Reiseziele, Hotels, Erlebnisse suchen...",
        "NOTIFICATIONS": "Benachrichtigungen",
        "MARK_ALL_READ": "Alle als gelesen markieren",
        "NO_NOTIFICATIONS": "Keine neuen Benachrichtigungen",
        "LANGUAGE": "Sprache",
        "THEME": "Design",
        "PROFILE_SETTINGS": "Profileinstellungen",
        "MY_BOOKINGS": "Meine Buchungen",
        "FAVORITES": "Favoriten",
        "LOGOUT": "Abmelden",
        "SIGN_IN": "Anmelden",
        "REGISTER": "Registrieren"
      },
      "NAVIGATION": {
        "HOME": "Startseite",
        "EXPLORE": "Entdecken",
        "DESTINATIONS": "Reiseziele",
        "EXPERIENCES": "Erlebnisse",
        "TRAVEL_GUIDES": "Reiseführer",
        "BOOK": "Buchen",
        "FLIGHTS": "Flüge",
        "HOTELS": "Hotels",
        "CAR_RENTAL": "Mietwagen",
        "COMMUNITY": "Community"
      },
      "HOME": {
        "HERO_TITLE": "Entdecken Sie Ihr Nächstes",
        "HERO_SUBTITLE": "Abenteuer",
        "HERO_DESCRIPTION": "Erkunden Sie erstaunliche Reiseziele, buchen Sie unglaubliche Erlebnisse und verbinden Sie sich mit Mitreisenden aus aller Welt.",
        "START_JOURNEY": "Beginnen Sie Ihre Reise",
        "COMMUNITY": "Community"
      },
      "NOTIFICATIONS": {
        "FLIGHT_BOOKING_CONFIRMED": "Flugbuchung Bestätigt",
        "FLIGHT_BOOKING_MESSAGE": "Ihr Flug nach Paris wurde für den 15. März 2024 bestätigt",
        "CHECK_IN_REMINDER": "Check-in Erinnerung",
        "CHECK_IN_MESSAGE": "Vergessen Sie nicht, online für Ihren morgigen Flug einzuchecken",
        "SPECIAL_HOTEL_DEAL": "Spezielles Hotelangebot",
        "HOTEL_DEAL_MESSAGE": "30% Rabatt auf Luxushotels in Rom - Zeitlich begrenztes Angebot!"
      }
    };
    this.translate.setTranslation('de', deTranslations);
  }

  private loadItalianTranslations(): void {
    const itTranslations = {
      "HEADER": {
        "BRAND": "TravelHub",
        "TAGLINE": "Il Tuo Viaggio Inizia Qui",
        "SEARCH_PLACEHOLDER": "Cerca destinazioni, hotel, esperienze...",
        "NOTIFICATIONS": "Notifiche",
        "MARK_ALL_READ": "Segna tutto come letto",
        "NO_NOTIFICATIONS": "Nessuna nuova notifica",
        "LANGUAGE": "Lingua",
        "THEME": "Tema",
        "PROFILE_SETTINGS": "Impostazioni Profilo",
        "MY_BOOKINGS": "Le Mie Prenotazioni",
        "FAVORITES": "Preferiti",
        "LOGOUT": "Esci",
        "SIGN_IN": "Accedi",
        "REGISTER": "Registrati"
      },
      "NAVIGATION": {
        "HOME": "Home",
        "EXPLORE": "Esplora",
        "DESTINATIONS": "Destinazioni",
        "EXPERIENCES": "Esperienze",
        "TRAVEL_GUIDES": "Guide di Viaggio",
        "BOOK": "Prenota",
        "FLIGHTS": "Voli",
        "HOTELS": "Hotel",
        "CAR_RENTAL": "Noleggio Auto",
        "COMMUNITY": "Comunità"
      },
      "HOME": {
        "HERO_TITLE": "Scopri la Tua Prossima",
        "HERO_SUBTITLE": "Avventura",
        "HERO_DESCRIPTION": "Esplora destinazioni incredibili, prenota esperienze uniche e connettiti con altri viaggiatori in tutto il mondo.",
        "START_JOURNEY": "Inizia il Tuo Viaggio",
        "COMMUNITY": "Comunità"
      },
      "NOTIFICATIONS": {
        "FLIGHT_BOOKING_CONFIRMED": "Prenotazione Volo Confermata",
        "FLIGHT_BOOKING_MESSAGE": "Il tuo volo per Parigi è stato confermato per il 15 marzo 2024",
        "CHECK_IN_REMINDER": "Promemoria Check-in",
        "CHECK_IN_MESSAGE": "Non dimenticare di fare il check-in online per il tuo volo di domani",
        "SPECIAL_HOTEL_DEAL": "Offerta Speciale Hotel",
        "HOTEL_DEAL_MESSAGE": "30% di sconto su hotel di lusso a Roma - Offerta a tempo limitato!"
      }
    };
    this.translate.setTranslation('it', itTranslations);
  }

  private loadPortugueseTranslations(): void {
    const ptTranslations = {
      "HEADER": {
        "BRAND": "TravelHub",
        "TAGLINE": "Sua Jornada Começa Aqui",
        "SEARCH_PLACEHOLDER": "Pesquisar destinos, hotéis, experiências...",
        "NOTIFICATIONS": "Notificações",
        "MARK_ALL_READ": "Marcar tudo como lido",
        "NO_NOTIFICATIONS": "Nenhuma nova notificação",
        "LANGUAGE": "Idioma",
        "THEME": "Tema",
        "PROFILE_SETTINGS": "Configurações do Perfil",
        "MY_BOOKINGS": "Minhas Reservas",
        "FAVORITES": "Favoritos",
        "LOGOUT": "Sair",
        "SIGN_IN": "Entrar",
        "REGISTER": "Registrar"
      },
      "NAVIGATION": {
        "HOME": "Início",
        "EXPLORE": "Explorar",
        "DESTINATIONS": "Destinos",
        "EXPERIENCES": "Experiências",
        "TRAVEL_GUIDES": "Guias de Viagem",
        "BOOK": "Reservar",
        "FLIGHTS": "Voos",
        "HOTELS": "Hotéis",
        "CAR_RENTAL": "Aluguel de Carros",
        "COMMUNITY": "Comunidade"
      },
      "HOME": {
        "HERO_TITLE": "Descubra Sua Próxima",
        "HERO_SUBTITLE": "Aventura",
        "HERO_DESCRIPTION": "Explore destinos incríveis, reserve experiências únicas e conecte-se com outros viajantes ao redor do mundo.",
        "START_JOURNEY": "Comece Sua Jornada",
        "COMMUNITY": "Comunidade"
      },
      "NOTIFICATIONS": {
        "FLIGHT_BOOKING_CONFIRMED": "Reserva de Voo Confirmada",
        "FLIGHT_BOOKING_MESSAGE": "Seu voo para Paris foi confirmado para 15 de março de 2024",
        "CHECK_IN_REMINDER": "Lembrete de Check-in",
        "CHECK_IN_MESSAGE": "Não esqueça de fazer o check-in online para seu voo de amanhã",
        "SPECIAL_HOTEL_DEAL": "Oferta Especial de Hotel",
        "HOTEL_DEAL_MESSAGE": "30% de desconto em hotéis de luxo em Roma - Oferta por tempo limitado!"
      }
    };
    this.translate.setTranslation('pt', ptTranslations);
  }

  private loadJapaneseTranslations(): void {
    const jaTranslations = {
      "HEADER": {
        "BRAND": "TravelHub",
        "TAGLINE": "あなたの旅はここから始まります",
        "SEARCH_PLACEHOLDER": "目的地、ホテル、体験を検索...",
        "NOTIFICATIONS": "通知",
        "MARK_ALL_READ": "すべて既読にする",
        "NO_NOTIFICATIONS": "新しい通知はありません",
        "LANGUAGE": "言語",
        "THEME": "テーマ",
        "PROFILE_SETTINGS": "プロフィール設定",
        "MY_BOOKINGS": "マイ予約",
        "FAVORITES": "お気に入り",
        "LOGOUT": "ログアウト",
        "SIGN_IN": "サインイン",
        "REGISTER": "登録"
      },
      "NAVIGATION": {
        "HOME": "ホーム",
        "EXPLORE": "探索",
        "DESTINATIONS": "目的地",
        "EXPERIENCES": "体験",
        "TRAVEL_GUIDES": "旅行ガイド",
        "BOOK": "予約",
        "FLIGHTS": "フライト",
        "HOTELS": "ホテル",
        "CAR_RENTAL": "レンタカー",
        "COMMUNITY": "コミュニティ"
      },
      "HOME": {
        "HERO_TITLE": "次の旅を発見",
        "HERO_SUBTITLE": "アドベンチャー",
        "HERO_DESCRIPTION": "素晴らしい目的地を探索し、信じられない体験を予約し、世界中の仲間の旅行者とつながりましょう。",
        "START_JOURNEY": "旅を始める",
        "COMMUNITY": "コミュニティ"
      },
      "NOTIFICATIONS": {
        "FLIGHT_BOOKING_CONFIRMED": "フライト予約確認",
        "FLIGHT_BOOKING_MESSAGE": "2024年3月15日のパリ行きフライトが確認されました",
        "CHECK_IN_REMINDER": "チェックイン リマインダー",
        "CHECK_IN_MESSAGE": "明日のフライトのオンラインチェックインをお忘れなく",
        "SPECIAL_HOTEL_DEAL": "特別ホテル取引",
        "HOTEL_DEAL_MESSAGE": "ローマの高級ホテルが30%オフ - 期間限定オファー！"
      }
    };
    this.translate.setTranslation('ja', jaTranslations);
  }

  private loadChineseTranslations(): void {
    const cnTranslations = {
      "HEADER": {
        "BRAND": "TravelHub",
        "TAGLINE": "您的旅程从这里开始",
        "SEARCH_PLACEHOLDER": "搜索目的地、酒店、体验...",
        "NOTIFICATIONS": "通知",
        "MARK_ALL_READ": "全部标记为已读",
        "NO_NOTIFICATIONS": "没有新通知",
        "LANGUAGE": "语言",
        "THEME": "主题",
        "PROFILE_SETTINGS": "个人资料设置",
        "MY_BOOKINGS": "我的预订",
        "FAVORITES": "收藏夹",
        "LOGOUT": "登出",
        "SIGN_IN": "登录",
        "REGISTER": "注册"
      },
      "NAVIGATION": {
        "HOME": "首页",
        "EXPLORE": "探索",
        "DESTINATIONS": "目的地",
        "EXPERIENCES": "体验",
        "TRAVEL_GUIDES": "旅行指南",
        "BOOK": "预订",
        "FLIGHTS": "航班",
        "HOTELS": "酒店",
        "CAR_RENTAL": "租车",
        "COMMUNITY": "社区"
      },
      "HOME": {
        "HERO_TITLE": "发现您的下一个",
        "HERO_SUBTITLE": "冒险",
        "HERO_DESCRIPTION": "探索令人惊叹的目的地，预订难忘的体验，与世界各地的旅行者建立联系。",
        "START_JOURNEY": "开始您的旅程",
        "COMMUNITY": "社区"
      },
      "NOTIFICATIONS": {
        "FLIGHT_BOOKING_CONFIRMED": "航班预订已确认",
        "FLIGHT_BOOKING_MESSAGE": "您前往巴黎的航班已确认，日期为2024年3月15日",
        "CHECK_IN_REMINDER": "值机提醒",
        "CHECK_IN_MESSAGE": "别忘了为明天的航班在线值机",
        "SPECIAL_HOTEL_DEAL": "特别酒店优惠",
        "HOTEL_DEAL_MESSAGE": "罗马豪华酒店7折优惠 - 限时优惠！"
      }
    };
    this.translate.setTranslation('cn', cnTranslations);
  }

  public setLanguage(languageCode: string): void {
    if (this.supportedLanguages.find(lang => lang.code === languageCode)) {
      this.translate.use(languageCode);
      this.currentLanguageSubject.next(languageCode);
      localStorage.setItem('selectedLanguage', languageCode);
      
      // Update document language attribute for accessibility
      document.documentElement.lang = languageCode;
    }
  }

  public getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  public getCurrentLanguageInfo(): Language | undefined {
    return this.supportedLanguages.find(lang => lang.code === this.getCurrentLanguage());
  }

  public getTranslation(key: string, params?: any): Observable<string> {
    return this.translate.get(key, params);
  }

  public getInstantTranslation(key: string, params?: any): string {
    return this.translate.instant(key, params);
  }

  public isLanguageSupported(languageCode: string): boolean {
    return this.supportedLanguages.some(lang => lang.code === languageCode);
  }
}
