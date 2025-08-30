#!/bin/bash
# Install dependencies
npm install

# Create the output directory
mkdir -p dist/frontend

# Copy _redirects to the output directory first
cp src/assets/_redirects dist/frontend/

# Build the Angular app with production configuration
npm run build -- --configuration=production --output-path=dist/frontend

# List files for debugging
ls -la dist/frontend/
