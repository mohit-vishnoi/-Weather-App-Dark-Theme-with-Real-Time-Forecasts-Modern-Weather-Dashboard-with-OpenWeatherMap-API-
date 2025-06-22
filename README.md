# Weather App

A responsive and accessible weather application that provides current weather information for any city or your current location.

## Features

- Search weather by city name (with optional country code)
- Get weather for your current location using geolocation
- Detailed weather information including:
  - Current temperature and "feels like" temperature
  - Weather conditions (sunny, rainy, cloudy, etc.)
  - Humidity, wind speed, and atmospheric pressure
  - Visibility and cloudiness percentage
  - Sunrise and sunset times
- Responsive design that works on all device sizes
- Dark mode theme for comfortable viewing
- Accessible interface with proper ARIA attributes
- Animated weather icons

## Technologies Used

- HTML5
- CSS3 (with CSS variables for theming)
- JavaScript (ES6)
- Bootstrap 5 (for responsive layout and components)
- Font Awesome (for icons)
- OpenWeatherMap API (for weather data)

## How to Use

1. Enter a city name in the search field (you can add a country code for more accurate results, e.g., "London,UK")
2. Click the "Search" button or press Enter
3. Alternatively, click "My Location" to get weather for your current location
4. View the weather details in the modal that appears

## Installation

No installation required - this is a client-side only application. Simply open the `index.html` file in any modern web browser.

## API Key Note

This application uses a free-tier OpenWeatherMap API key that's included in the code. For production use, you should:

1. Get your own API key from [OpenWeatherMap](https://openweathermap.org/)
2. Replace the `apiKey` variable in the JavaScript code with your own key

## Accessibility Features

- Proper ARIA attributes for screen reader support
- Keyboard navigable interface
- Sufficient color contrast
- Text alternatives for icons
- Focus management for modal dialogs

## Future Improvements

- 5-day weather forecast
- Hourly weather predictions
- Temperature unit toggle (Celsius/Fahrenheit)
- Local storage for recent searches
- More detailed weather maps
- Air quality information
