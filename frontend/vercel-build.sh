#!/bin/bash
# Exit on error
set -e

# Install dependencies
npm install

# Build the Angular app with production configuration
npm run build --configuration=production

# Ensure the output directory exists
mkdir -p dist/frontend

# Copy _redirects file for SPA routing
cp src/assets/_redirects dist/frontend/ 2>/dev/null || :

# List files for debugging
echo "Build output directory contents:"
ls -la dist/frontend/
