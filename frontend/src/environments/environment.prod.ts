export const environment = {
  production: true,
  apiUrl: 'https://wander-wise-hub.onrender.com/api',
  appName: 'TravelApp',
  version: '1.0.0',
  features: {
    enableAnalytics: true,
    enablePushNotifications: true,
    enableOfflineMode: true
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
