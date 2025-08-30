#!/bin/bash
# Install dependencies
npm install

# Build the Angular app with production configuration
npm run build --configuration=production

# List files for debugging
ls -la dist/frontend/
