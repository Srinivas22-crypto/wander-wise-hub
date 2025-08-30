#!/bin/bash
# Install dependencies
npm install

# Build the Angular app with production configuration
npm run build -- --configuration=production --output-path=dist/frontend

# Ensure the output directory exists
mkdir -p dist/frontend

# Copy _redirects to the output directory
cp src/assets/_redirects dist/frontend/

# List files for debugging
ls -la dist/frontend/
