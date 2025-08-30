// This file is used for production deployment
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`,
// but if you do `ng build --configuration=production` then `environment.prod.ts` will be used instead.

export const environment = {
  production: true,
  // Use production backend API
  apiUrl: 'https://wander-wise-hub.onrender.com/api',
  appName: 'WanderWise',
  version: '1.0.0',
  features: {
    enableAnalytics: true,
    enablePushNotifications: true,
    enableOfflineMode: true
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
