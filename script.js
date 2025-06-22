document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const getLocationBtn = document.getElementById('getLocationBtn');
    const cityInput = document.getElementById('cityInput');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorAlert = document.getElementById('errorAlert');
    
    const weatherModal = new bootstrap.Modal(document.getElementById('weatherModal'));
    
    getWeatherBtn.addEventListener('click', fetchWeatherData);
    getLocationBtn.addEventListener('click', fetchLocationWeather);
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            fetchWeatherData();
        }
    });
    
    function fetchWeatherData() {
        const city = cityInput.value.trim();
        
        if (!city) {
            showError('Please enter a city name');
            return;
        }
        
        // Show loading spinner
        loadingSpinner.style.display = 'block';
        // Hide error alert if visible
        errorAlert.classList.add('d-none');
        
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('City not found. Please check the spelling and try again.');
                    } else {
                        throw new Error(`Error: ${response.status}`);
                    }
                }
                return response.json();
            })
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                showError(error.message || 'Failed to fetch weather data. Please check your connection and try again.');
            })
            .finally(() => {
                loadingSpinner.style.display = 'none';
            });
    }
    
    function fetchLocationWeather() {
        if (!navigator.geolocation) {
            showError('Geolocation is not supported by your browser');
            return;
        }
        
        // Show loading spinner
        loadingSpinner.style.display = 'block';
        // Hide error alert if visible
        errorAlert.classList.add('d-none');
        
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                
                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        displayWeatherData(data);
                        // Update the city input with the detected location
                        cityInput.value = `${data.name}, ${data.sys.country}`;
                    })
                    .catch(error => {
                        console.error('Error fetching weather data:', error);
                        showError('Failed to fetch weather data for your location. Please try again.');
                    })
                    .finally(() => {
                        loadingSpinner.style.display = 'none';
                    });
            },
            error => {
                console.error('Error getting location:', error);
                loadingSpinner.style.display = 'none';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        showError('Location access was denied. Please enable location services and try again.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        showError('Location information is unavailable.');
                        break;
                    case error.TIMEOUT:
                        showError('The request to get your location timed out.');
                        break;
                    default:
                        showError('An unknown error occurred while getting your location.');
                }
            }
        );
    }
    
    function displayWeatherData(data) {
        console.log(data); // For debugging
        
        // Set modal content
        document.getElementById('modalCityName').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('modalTemperature').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('modalWeatherDesc').textContent = data.weather[0].description;
        
        // Set weather icon
        const weatherIcon = getWeatherIcon(data.weather[0].id, data.weather[0].icon);
        const modalWeatherIcon = document.getElementById('modalWeatherIcon');
        modalWeatherIcon.innerHTML = '';
        modalWeatherIcon.appendChild(weatherIcon);
        
        // Set other weather details
        document.getElementById('modalFeelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById('modalHumidity').textContent = data.main.humidity;
        document.getElementById('modalWindSpeed').textContent = data.wind.speed;
        document.getElementById('modalPressure').textContent = data.main.pressure;
        document.getElementById('modalTempMax').textContent = `${Math.round(data.main.temp_max)}°C`;
        document.getElementById('modalTempMin').textContent = `${Math.round(data.main.temp_min)}°C`;
        document.getElementById('modalVisibility').textContent = data.visibility;
        document.getElementById('modalCloudiness').textContent = data.clouds.all;
        
        // Convert sunrise and sunset times
        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);
        document.getElementById('modalSunrise').textContent = sunriseTime.toLocaleTimeString();
        document.getElementById('modalSunset').textContent = sunsetTime.toLocaleTimeString();
        
        // Show the modal
        weatherModal.show();
        
        // Focus on the modal for screen readers
        setTimeout(() => {
            document.querySelector('.modal-title').focus();
        }, 500);
    }
    
    function showError(message) {
        errorAlert.textContent = message;
        errorAlert.classList.remove('d-none');
        errorAlert.focus();
    }
    
    function getWeatherIcon(weatherId, iconCode) {
        const icon = document.createElement('i');
        icon.setAttribute('aria-hidden', 'true');
        
        // Day/night icons
        const isDay = iconCode.includes('d');
        
        // Map weather conditions to appropriate icons
        if (weatherId >= 200 && weatherId < 300) {
            // Thunderstorm
            icon.className = 'fas fa-bolt';
            icon.style.color = '#ffeb3b'; // Yellow for lightning
        } else if (weatherId >= 300 && weatherId < 400) {
            // Drizzle
            icon.className = 'fas fa-cloud-rain';
            icon.style.color = '#4fc3f7'; // Light blue for drizzle
        } else if (weatherId >= 500 && weatherId < 600) {
            // Rain
            icon.className = 'fas fa-cloud-showers-heavy';
            icon.style.color = '#2196f3'; // Blue for rain
        } else if (weatherId >= 600 && weatherId < 700) {
            // Snow
            icon.className = 'fas fa-snowflake';
            icon.style.color = '#b3e5fc'; // Light blue for snow
        } else if (weatherId >= 700 && weatherId < 800) {
            // Atmosphere (fog, mist, etc.)
            icon.className = 'fas fa-smog';
            icon.style.color = '#9e9e9e'; // Gray for fog
        } else if (weatherId === 800) {
            // Clear
            icon.className = isDay ? 'fas fa-sun' : 'fas fa-moon';
            icon.style.color = isDay ? '#ffc107' : '#e0e0e0'; // Yellow for sun, light gray for moon
        } else if (weatherId > 800) {
            // Clouds
            if (weatherId === 801) {
                icon.className = isDay ? 'fas fa-cloud-sun' : 'fas fa-cloud-moon';
            } else if (weatherId === 802) {
                icon.className = 'fas fa-cloud';
            } else {
                icon.className = 'fas fa-clouds';
            }
            icon.style.color = '#bdbdbd'; // Light gray for clouds
        } else {
            // Default
            icon.className = 'fas fa-cloud';
            icon.style.color = '#bdbdbd';
        }
        
        return icon;
    }
});Enter file contents here
