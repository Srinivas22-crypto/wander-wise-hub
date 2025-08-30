const fs = require('fs');

// This script will be used in package.json to ensure the correct environment is used
const env = process.env.NODE_ENV || 'development';
const targetPath = `./src/environments/environment.${env}.ts`;
const envConfig = `export const environment = {
  production: ${env === 'production'},
  apiUrl: '${env === 'production' ? 'https://wander-wise-hub.onrender.com/api' : 'http://localhost:3000/api'}',
  // Add other environment-specific variables here
};
`;

fs.writeFileSync(targetPath, envConfig, 'utf8');
console.log(`Using ${env} environment with API URL: ${env === 'production' ? 'https://wander-wise-hub.onrender.com/api' : 'http://localhost:3000/api'}`);
