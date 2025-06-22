# Weather App

A simple, responsive weather application that displays current weather conditions for any city or your current location.

## Features

- Search weather by city name (e.g., "London" or "London,UK")
- Get weather for your current location using geolocation
- Detailed weather information including:
  - Current temperature and "feels like" temperature
  - Weather conditions (clear, cloudy, rain, etc.)
  - Humidity, wind speed, and atmospheric pressure
  - Visibility and cloudiness percentages
  - Sunrise and sunset times
- Dark mode interface with accessible color scheme
- Responsive design that works on mobile and desktop
- Loading spinner during API requests
- Error handling with user-friendly messages

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (ES6)
- Bootstrap 5 (for responsive layout and components)
- Font Awesome (for icons)
- OpenWeatherMap API (for weather data)

## Setup Instructions

1. Clone or download this repository
2. Open `index.html` in your web browser
3. To use your own API key:
   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Replace `YOUR_API_KEY_HERE` in `script.js` with your actual API key

## Usage

1. Enter a city name in the search field (e.g., "Paris" or "Tokyo,JP")
2. Click "Search" or press Enter
3. Alternatively, click "My Location" to get weather for your current position
4. View detailed weather information in the modal that appears

## Browser Support

The app should work in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

Note: Geolocation feature requires HTTPS in most browsers except for localhost.
