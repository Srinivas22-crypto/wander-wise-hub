#!/bin/bash
# Install dependencies
npm install

# Build the Angular app
npm run build

# Copy _redirects to the output directory
cp src/assets/_redirects dist/frontend/

# List files for debugging
ls -la dist/frontend/
