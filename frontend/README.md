# Social Media Analytics Frontend

A React-based frontend application for analyzing social media data. This application provides real-time insights into user engagement, trending posts, and top contributors.

## Features

- Real-time feed of social media posts
- Top users analytics based on engagement
- Trending posts with comment statistics
- Responsive Material UI design
- Real-time updates through polling

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Main page components
- `/src/services` - API service layer
- `/src/App.js` - Main application component
- `/src/index.js` - Application entry point

## API Integration

The application connects to a backend server running on http://localhost:3000. Make sure the backend server is running before starting the frontend application.

## Technologies Used

- React 18
- Material UI
- React Router
- Axios for API calls 