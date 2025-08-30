import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from '../models/Destination.js';
import connectDB from '../config/database.js';

// Load environment variables
dotenv.config();

const destinationsData = [
  {
    name: "Bali",
    description: "Indonesia's tropical paradise known for its stunning beaches, lush rice terraces, ancient temples, and vibrant culture. Perfect for relaxation and spiritual experiences.",
    country: "Indonesia",
    city: "Bali",
    category: "beach",
    images: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2"
    ],
    coordinates: {
      type: "Point",
      coordinates: [115.1889, -8.4095]
    },
    averageRating: 4.6,
    totalReviews: 534,
    popularActivities: ["Beach Activities", "Temple Visits", "Surfing", "Spa Treatments", "Rice Terrace Tours"],
    bestTimeToVisit: "April to October for dry season",
    estimatedBudget: {
      budget: 80,
      luxury: 2000
    },
    isActive: true
  },
  {
    name: "Santorini",
    description: "A stunning Greek island famous for its white-washed buildings, blue-domed churches, dramatic cliffs, and breathtaking sunsets over the Aegean Sea.",
    country: "Greece",
    city: "Santorini",
    category: "beach",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf"
    ],
    coordinates: {
      type: "Point",
      coordinates: [25.4615, 36.3932]
    },
    averageRating: 4.9,
    totalReviews: 423,
    popularActivities: ["Sunset Viewing", "Beach Activities", "Wine Tasting", "Boat Tours", "Village Exploration"],
    bestTimeToVisit: "April to October for warm weather and swimming",
    estimatedBudget: {
      budget: 180,
      luxury: 3000
    },
    isActive: true
  },
  {
    name: "New York City",
    description: "The Big Apple, a bustling metropolis known for its iconic skyline, Broadway shows, world-class museums, diverse neighborhoods, and vibrant energy.",
    country: "United States",
    city: "New York",
    category: "city",
    images: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
      "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7"
    ],
    coordinates: {
      type: "Point",
      coordinates: [-74.0060, 40.7128]
    },
    averageRating: 4.3,
    totalReviews: 687,
    popularActivities: ["Broadway Shows", "Museum Visits", "Shopping", "Statue of Liberty", "Central Park"],
    bestTimeToVisit: "April to June and September to November for pleasant weather",
    estimatedBudget: {
      budget: 200,
      luxury: 3200
    },
    isActive: true
  },
  {
    name: "Swiss Alps",
    description: "Majestic mountain range offering breathtaking landscapes, pristine lakes, charming villages, and world-class skiing. Perfect for adventure and nature lovers.",
    country: "Switzerland",
    city: "Zermatt",
    category: "mountain",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    ],
    coordinates: {
      type: "Point",
      coordinates: [8.2275, 46.8017]
    },
    averageRating: 4.8,
    totalReviews: 278,
    popularActivities: ["Skiing", "Hiking", "Mountain Climbing", "Scenic Train Rides", "Lake Tours"],
    bestTimeToVisit: "December to March for skiing, June to September for hiking",
    estimatedBudget: {
      budget: 250,
      luxury: 4000
    },
    isActive: true
  },
  {
    name: "Rome",
    description: "The Eternal City, rich in history and culture with ancient ruins, magnificent architecture, world-renowned art, and incredible Italian cuisine.",
    country: "Italy",
    city: "Rome",
    category: "cultural",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHhwdNLG4zEL3YJ69Rem1uww--1V54IyfRUw&s",
      "https://www.italyperfect.com/g/photos/upload/sml_845543004-1590582528-ip-info-rome.jpg"
    ],
    coordinates: {
      type: "Point",
      coordinates: [12.4964, 41.9028]
    },
    averageRating: 4.6,
    totalReviews: 412,
    popularActivities: ["Colosseum Tour", "Vatican Museums", "Historic Site Visits", "Food Tours", "Piazza Exploration"],
    bestTimeToVisit: "April to May and September to October for mild weather",
    estimatedBudget: {
      budget: 130,
      luxury: 2500
    },
    isActive: true
  },
  {
    name: "Machu Picchu",
    description: "Ancient Inca citadel perched high in the Andes Mountains. A UNESCO World Heritage site offering incredible history, stunning views, and spiritual experiences.",
    country: "Peru",
    city: "Cusco",
    category: "cultural",
    images: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377"
    ],
    coordinates: {
      type: "Point",
      coordinates: [-72.5450, -13.1631]
    },
    averageRating: 4.9,
    totalReviews: 289,
    popularActivities: ["Inca Trail Hike", "Ruins Exploration", "Mountain Views", "Cultural Tours", "Sun Gate Visit"],
    bestTimeToVisit: "May to September for dry season",
    estimatedBudget: {
      budget: 100,
      luxury: 1800
    },
    isActive: true
  },
  {
    name: "Dubai",
    description: "A modern metropolis in the desert, known for luxury shopping, ultramodern architecture, vibrant nightlife, and world-class hospitality.",
    country: "United Arab Emirates",
    city: "Dubai",
    category: "city",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
      "https://images.unsplash.com/photo-1542259005000-4cfa2c1feb17"
    ],
    coordinates: {
      type: "Point",
      coordinates: [55.2708, 25.2048]
    },
    averageRating: 4.4,
    totalReviews: 356,
    popularActivities: ["Burj Khalifa Visit", "Desert Safari", "Shopping", "Luxury Dining", "Palm Jumeirah"],
    bestTimeToVisit: "November to March for pleasant temperatures",
    estimatedBudget: {
      budget: 180,
      luxury: 5000
    },
    isActive: true
  },
  {
    name: "Maldives",
    description: "Tropical paradise with crystal-clear waters, pristine white sand beaches, luxury overwater bungalows, and incredible marine life. Perfect for romantic getaways.",
    country: "Maldives",
    city: "Malé",
    category: "beach",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22"
    ],
    coordinates: {
      type: "Point",
      coordinates: [73.5361, 4.1755]
    },
    averageRating: 4.8,
    totalReviews: 267,
    popularActivities: ["Snorkeling", "Diving", "Island Hopping", "Spa Treatments", "Sunset Cruises"],
    bestTimeToVisit: "November to April for dry season",
    estimatedBudget: {
      budget: 300,
      luxury: 6000
    },
    isActive: true
  },
  {
    name: "Tokyo",
    description: "A vibrant metropolis blending traditional culture with cutting-edge technology. Experience ancient temples, modern skyscrapers, incredible cuisine, and unique pop culture.",
    country: "Japan",
    city: "Tokyo",
    category: "city",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65"
    ],
    coordinates: {
      type: "Point",
      coordinates: [139.6917, 35.6895]
    },
    averageRating: 4.8,
    totalReviews: 324,
    popularActivities: ["Sightseeing", "Shopping", "Cultural Experiences", "Food Tours", "Temple Visits"],
    bestTimeToVisit: "March to May and September to November for mild weather",
    estimatedBudget: {
      budget: 120,
      luxury: 3500
    },
    isActive: true
  },
  {
    name: "Paris",
    description: "The City of Light, known for its art, fashion, gastronomy, and culture. Home to iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
    country: "France",
    city: "Paris",
    category: "city",
    images: [
      "https://parisbypierre.com/images/visit-paris-city-guide.webp",
      "https://uceap.universityofcalifornia.edu/sites/default/files/marketing-images/life-in-city-images/paris-france-gallery-2.jpg"
    ],
    coordinates: {
      type: "Point",
      coordinates: [2.3522, 48.8566]
    },
    averageRating: 4.7,
    totalReviews: 512,
    popularActivities: ["Museum Visits", "Eiffel Tower", "River Cruises", "Culinary Tours", "Shopping"],
    bestTimeToVisit: "April to June and October to November for pleasant weather",
    estimatedBudget: {
      budget: 150,
      luxury: 2500
    },
    isActive: true
  },
  {
    name: "Tuscany",
    description: "Rolling hills, vineyards, and authentic Italian cuisine.",
    country: "Italy",
    city: "Florence",
    category: "cultural",
    images: [
      "https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d",
      "https://images.unsplash.com/photo-1499678329028-101435549a4e"
    ],
    coordinates: {
      type: "Point",
      coordinates: [11.2558, 43.7696]
    },
    averageRating: 4.8,
    totalReviews: 189,
    popularActivities: ["Wine Tasting", "Vineyard Tours", "Cooking Classes", "Historic Site Visits", "Countryside Tours"],
    bestTimeToVisit: "April to May and September to October for mild weather and harvest season",
    estimatedBudget: {
      budget: 130,
      luxury: 2800
    },
    isActive: true
  },
  {
    name: "Costa Rica",
    description: "Rich biodiversity and stunning natural landscapes.",
    country: "Costa Rica",
    city: "San José",
    category: "adventure",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    ],
    coordinates: {
      type: "Point",
      coordinates: [-84.0907, 9.9281]
    },
    averageRating: 4.6,
    totalReviews: 156,
    popularActivities: ["Rainforest Tours", "Wildlife Watching", "Ziplining", "Beach Activities", "Volcano Tours"],
    bestTimeToVisit: "December to April for dry season",
    estimatedBudget: {
      budget: 47,
      luxury: 1500
    },
    isActive: true
  }
];

const seedDestinations = async () => {
  try {
    console.log('🌱 Starting destination seeding process...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing destinations
    console.log('🗑️  Clearing existing destinations...');
    await Destination.deleteMany({});
    
    // Insert new destinations
    console.log('📍 Inserting new destinations...');
    const insertedDestinations = await Destination.insertMany(destinationsData);
    
    console.log(`✅ Successfully seeded ${insertedDestinations.length} destinations:`);
    insertedDestinations.forEach((dest, index) => {
      console.log(`   ${index + 1}. ${dest.name}, ${dest.country} (${dest.category})`);
    });
    
    console.log('\n📊 Seeding Summary:');
    console.log(`   • Total destinations: ${insertedDestinations.length}`);
    console.log(`   • Categories: ${[...new Set(destinationsData.map(d => d.category))].join(', ')}`);
    console.log(`   • Countries: ${[...new Set(destinationsData.map(d => d.country))].length}`);
    console.log(`   • Total images: ${destinationsData.reduce((sum, d) => sum + d.images.length, 0)}`);
    
  } catch (error) {
    console.error('❌ Error seeding destinations:', error.message);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the seeding script
seedDestinations();
