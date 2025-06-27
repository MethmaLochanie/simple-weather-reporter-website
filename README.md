⚠ **Notice**

This project is proprietary. No use, reproduction, modification, or distribution of this software or its source code is allowed without explicit written permission from the author, Methma Lochanie Rathnayaka.

If you wish to reference this work or request usage permissions, please contact the author directly.

Unauthorized use will be considered a violation of copyright and may lead to legal action.

# 🌤️ Weather Reporter

A modern, full-stack weather application built with React, Node.js, and MongoDB. Get real-time weather information for any city with an intuitive interface and user authentication system.

## ✨ Features

### 🌍 Weather Features
- **Real-time Weather Data**: Get current weather conditions including temperature, humidity, wind speed, UV index, and weather conditions
- **City Search with Google Maps**: Interactive map-based city selection with autocomplete
- **Geolocation Support**: Automatic weather for your current location
- **Weather Caching**: Optimized performance with 5-minute cache for weather data
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 👤 User Management
- **User Authentication**: Secure login and registration system
- **Email Verification**: Email-based account verification
- **User Profiles**: Manage your profile and location preferences
- **Location Tracking**: Save and update your location for personalized weather

### 🎨 Modern UI/UX
- **Beautiful Interface**: Gradient backgrounds and modern design
- **Interactive Maps**: Google Maps integration for city selection
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: User-friendly error messages and fallbacks
- **Responsive Layout**: Adaptive design for all screen sizes

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with SCSS
- **UI Components**: Ant Design for consistent UI components
- **State Management**: React Context API for global state
- **Data Fetching**: TanStack Query (React Query) for efficient API calls
- **Routing**: React Router DOM for navigation
- **Maps**: Google Maps API integration

### Backend (Node.js + Express)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Email Service**: Nodemailer for email verification
- **Rate Limiting**: Express rate limiter for API protection
- **CORS**: Configured for secure cross-origin requests

### External APIs
- **Weather API**: Weatherapi.com for weather data
- **Google Maps API**: For city search and geolocation
- **Reverse Geocoding**: For location name resolution

## 📁 Project Structure

```
simple-weather-reporter-website/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   │   └── assets/
│   │       └── bg/                  # Background images
│   ├── src/
│   │   ├── api/                     # API client functions
│   │   ├── components/              # React components
│   │   │   ├── Auth/               # Authentication components
│   │   │   ├── Weather/            # Weather display components
│   │   │   ├── UserProfile/        # User profile components
│   │   │   └── ...                 # Other UI components
│   │   ├── contexts/               # React Context providers
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── pages/                  # Page components
│   │   ├── styles/                 # SCSS and Tailwind styles
│   │   └── types/                  # TypeScript type definitions
│   ├── package.json
│   └── vite.config.ts
├── server/                         # Backend Node.js application
│   ├── src/
│   │   ├── controllers/            # Route controllers
│   │   ├── database/               # Database configuration
│   │   ├── middleware/             # Express middleware
│   │   ├── models/                 # Mongoose models
│   │   ├── routes/                 # API routes
│   │   ├── services/               # Business logic services
│   │   └── types/                  # TypeScript type definitions
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml              # Docker configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB database
- Google Maps API key
- Weather API key (Weatherapi.com)

### Environment Variables

#### Frontend (.env in client directory)
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_API_BASE_URL=http://localhost:5000/api
```

#### Backend (.env in server directory)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
WEATHER_API_KEY=your_weatherapi_key
WEATHER_API_URL=https://api.weatherapi.com/v1
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple-weather-reporter-website
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**
   - Create `.env` files in both `client/` and `server/` directories
   - Add the required environment variables as shown above

4. **Start the development servers**

   **Option 1: Using Docker (Recommended)**
   ```bash
   docker-compose up
   ```

   **Option 2: Manual start**
   ```bash
   # Start backend server (from server directory)
   cd server
   npm run dev
   
   # Start frontend server (from client directory, in new terminal)
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🛠️ Available Scripts

### Frontend (client/)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend (server/)
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification

### Weather
- `GET /api/weather?city=<city_name>` - Get weather data for a city

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/location` - Update user location

## 🐳 Docker Deployment

The project includes Docker configuration for easy deployment:

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in background
docker-compose up -d
```

## 🌐 Production Deployment

### Frontend (Vercel)
- The frontend is configured for Vercel deployment
- Includes `vercel.json` for SPA routing
- Environment variables can be set in Vercel dashboard

### Backend (Heroku/Railway)
- Includes `Procfile` for Heroku deployment
- Environment variables should be configured in deployment platform
- MongoDB Atlas recommended for production database

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling without exposing sensitive data

## 🎯 Key Features Implementation

### Weather Data Caching
- 5-minute cache for weather API responses
- Reduces API calls and improves performance
- Automatic cache invalidation

### Geolocation Integration
- Browser geolocation API integration
- Reverse geocoding for location names
- Fallback to last known location

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

### API Request Deduplication
- Prevents duplicate API calls for the same city
- Optimizes performance and reduces API usage
- Automatic cleanup of completed requests

## 🛠️ Development Workflow

### Code Organization
- **Component-based Architecture**: Modular React components with clear separation of concerns
- **Custom Hooks**: Reusable logic for weather data, geolocation, and API calls
- **Context Providers**: Global state management for authentication and loading states
- **Type Safety**: Full TypeScript implementation for better development experience

### State Management
- **React Context**: For global application state (auth, loading)
- **Local State**: Component-specific state with useState
- **Server State**: TanStack Query for API data management and caching

### Error Handling
- **Frontend**: User-friendly error messages with fallback UI
- **Backend**: Comprehensive error middleware with proper HTTP status codes
- **API**: Graceful degradation and retry mechanisms

## 🔧 Troubleshooting

### Common Issues

**Frontend won't start**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Backend connection issues**
- Verify MongoDB connection string
- Check if all environment variables are set
- Ensure port 5000 is available

**Weather API errors**
- Verify Weather API key is valid
- Check API rate limits
- Ensure city names are properly formatted

**Google Maps not loading**
- Verify Google Maps API key
- Check if billing is enabled for the API key
- Ensure the key has proper permissions

### Performance Optimization
- Weather data is cached for 5 minutes
- API requests are deduplicated
- Images are optimized and lazy-loaded
- Code splitting for better load times

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add proper error handling
- Test on multiple devices and browsers
- Update documentation for new features


## 🙏 Acknowledgments

- [Weatherapi.com](https://weatherapi.com/) for weather data
- [Google Maps API](https://developers.google.com/maps) for mapping services
- [Ant Design](https://ant.design/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Query](https://tanstack.com/query) for data fetching

## License

This project is licensed under the proprietary License.

---

**Built with ❤️ using modern web technologies** 
