# Database Seeding Scripts

This directory contains scripts to populate the database with sample data for the travel application.

## Available Scripts

### 1. Seed Destinations (`seedDestinations.js`)
Populates the database with 11 popular travel destinations including:
- **Cultural**: Paris, Rome, Kyoto, Barcelona, Marrakech
- **City**: Tokyo, New York City, Dubai
- **Beach**: Bali, Maldives, Phuket
- **Mountain**: Swiss Alps, Banff National Park
- **Adventure**: Machu Picchu, Iceland, Cape Town, Queenstown
- **Relaxation**: Santorini

Each destination includes:
- High-quality images from Unsplash
- Detailed descriptions
- Geographic coordinates
- Popular activities
- Best time to visit
- Budget estimates (budget and luxury)
- Average ratings and review counts

### 2. Seed More Destinations (`seedMoreDestinations.js`)
Adds 8 additional destinations to expand the database without clearing existing data.

## Usage

### Prerequisites
1. Ensure MongoDB is running
2. Set up your `.env` file with `MONGODB_URI`
3. Install dependencies: `npm install`

### Running the Scripts

#### Option 1: Using npm scripts (Recommended)
```bash
# Seed initial destinations (clears existing data)
npm run seed:destinations

# Add more destinations (preserves existing data)
npm run seed:more-destinations
```

#### Option 2: Direct execution
```bash
# From the backend directory
node scripts/seedDestinations.js
node scripts/seedMoreDestinations.js
```

## Script Features

### Data Quality
- ✅ All images are high-quality Unsplash URLs
- ✅ Realistic coordinates for each destination
- ✅ Comprehensive activity lists
- ✅ Accurate budget estimates
- ✅ Proper categorization

### Database Operations
- ✅ Automatic database connection
- ✅ Data validation using Mongoose schemas
- ✅ Graceful error handling
- ✅ Connection cleanup
- ✅ Detailed logging

### Safety Features
- ✅ Environment variable validation
- ✅ Schema compliance checking
- ✅ Rollback on errors
- ✅ Clear success/failure reporting

## Data Structure

Each destination includes:
```javascript
{
  name: "Destination Name",
  description: "Detailed description...",
  country: "Country Name",
  city: "City Name",
  category: "beach|mountain|city|cultural|adventure|relaxation",
  images: ["url1", "url2", "url3"],
  coordinates: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  averageRating: 4.5,
  totalReviews: 1000,
  popularActivities: ["Activity 1", "Activity 2"],
  bestTimeToVisit: "Best time description",
  estimatedBudget: {
    budget: 100,
    luxury: 300
  },
  isActive: true
}
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check `MONGODB_URI` in `.env` file
   - Verify network connectivity

2. **Schema Validation Error**
   - Check that all required fields are present
   - Verify coordinate format [longitude, latitude]
   - Ensure image URLs are valid HTTP/HTTPS

3. **Duplicate Key Error**
   - Run `seedDestinations.js` first to clear existing data
   - Or use `seedMoreDestinations.js` to add without clearing

### Logs
The scripts provide detailed logging:
- 🌱 Process start
- 🗑️ Data clearing (if applicable)
- 📍 Data insertion
- ✅ Success summary
- ❌ Error details
- 🔌 Connection cleanup

## Extending the Scripts

To add more destinations:
1. Follow the existing data structure
2. Use high-quality image URLs
3. Verify coordinates using Google Maps
4. Include realistic budget estimates
5. Add comprehensive activity lists

## Image Sources

All images are sourced from Unsplash with proper attribution:
- High resolution (2000+ pixels)
- Travel and destination focused
- Royalty-free usage
- Optimized for web display
