# WanderWise Hub API Endpoints Documentation

This document provides information about the available API endpoints for testing the WanderWise Hub backend services.

## Base URL
```
http://localhost:3000/api
```

## Authentication Endpoints

### Register User
- **POST** `/auth/register`
- **Body**:
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```

### Login
- **POST** `/auth/login`
- **Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

## User Endpoints

### Get User Profile
- **GET** `/users/profile`
- **Headers**: `Authorization: Bearer {token}`

### Update User Profile
- **PUT** `/users/profile`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "username": "updatedUsername",
    "bio": "Travel enthusiast"
  }
  ```

## Destination Endpoints

### Get All Destinations
- **GET** `/destinations`

### Get Single Destination
- **GET** `/destinations/{destinationId}`

### Search Destinations
- **GET** `/destinations/search?query={searchTerm}`

## Hotel Endpoints

### Search Hotels
- **GET** `/hotels/search`
- **Query Parameters**:
  - location (string)
  - checkIn (date)
  - checkOut (date)
  - guests (number)

### Get Hotel Details
- **GET** `/hotels/{hotelId}`

### Create Hotel Booking
- **POST** `/hotels/booking`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "hotelId": "hotel123",
    "checkIn": "2025-09-01",
    "checkOut": "2025-09-05",
    "guests": 2,
    "roomType": "deluxe"
  }
  ```

## Flight Endpoints

### Search Flights
- **GET** `/flights/search`
- **Query Parameters**:
  - from (string)
  - to (string)
  - date (date)
  - passengers (number)

### Get Flight Details
- **GET** `/flights/{flightId}`

### Create Flight Booking
- **POST** `/flights/booking`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "flightId": "flight123",
    "passengers": [
      {
        "name": "John Doe",
        "age": 30
      }
    ],
    "seatClass": "economy"
  }
  ```

## Car Rental Endpoints

### Search Cars
- **GET** `/cars/search`
- **Query Parameters**:
  - location (string)
  - pickupDate (date)
  - returnDate (date)

### Get Car Details
- **GET** `/cars/{carId}`

### Create Car Rental Booking
- **POST** `/cars/booking`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "carId": "car123",
    "pickupDate": "2025-09-01",
    "returnDate": "2025-09-05",
    "location": "Airport"
  }
  ```

## Community & Posts Endpoints

### Get All Posts
- **GET** `/posts`

### Create New Post
- **POST** `/posts`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "title": "My Amazing Trip",
    "content": "Had a wonderful experience...",
    "destination": "Paris",
    "images": ["url1", "url2"]
  }
  ```

### Get Post Details
- **GET** `/posts/{postId}`

### Update Post
- **PUT** `/posts/{postId}`
- **Headers**: `Authorization: Bearer {token}`

### Delete Post
- **DELETE** `/posts/{postId}`
- **Headers**: `Authorization: Bearer {token}`

## Group Travel Endpoints

### Create Travel Group
- **POST** `/groups`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "name": "Europe Trip 2025",
    "description": "Summer vacation in Europe",
    "destination": "Europe",
    "startDate": "2025-06-01",
    "endDate": "2025-06-15"
  }
  ```

### Get Group Details
- **GET** `/groups/{groupId}`

### Join Group
- **POST** `/groups/{groupId}/join`
- **Headers**: `Authorization: Bearer {token}`

## Payment Endpoints

### Create Payment
- **POST** `/payments`
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
  ```json
  {
    "amount": 999.99,
    "currency": "USD",
    "bookingId": "booking123",
    "paymentMethod": "card"
  }
  ```

### Get Payment Status
- **GET** `/payments/{paymentId}`
- **Headers**: `Authorization: Bearer {token}`

## Testing Tools

You can use tools like Postman or curl to test these endpoints. Here's a curl example for login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Notes

- All protected routes require a valid JWT token in the Authorization header
- Dates should be in ISO 8601 format (YYYY-MM-DD)
- Response codes:
  - 200: Success
  - 201: Created
  - 400: Bad Request
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
  - 500: Server Error
