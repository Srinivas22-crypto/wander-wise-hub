declare global {
  interface Window {
    env: {
      API_URL: string;
    };
  }
}

export const environment = {
  production: false,
  apiUrl: 'https://wander-wise-hub.onrender.com/api',
  appName: 'TravelApp',
  version: '1.0.0',
  features: {
    enableAnalytics: false,
    enablePushNotifications: true,
    enableOfflineMode: false
  },
  external: {
    googleMapsApiKey: '',
    stripePublicKey: '',
    firebaseConfig: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: ''
    }
  }
};
