// This file can be replaced during build by using the `fileReplacements` array.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Using production backend for both environments
  apiUrl: 'https://wander-wise-hub.onrender.com/api',
  appName: 'WanderWise - Dev',
  version: '1.0.0',
  features: {
    enableAnalytics: false,
    enablePushNotifications: false,
    enableOfflineMode: false
  },
  // External service configurations
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
