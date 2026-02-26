// Weather Widget - OpenWeather API integration
async function loadWeather() {
    const weatherContent = document.getElementById('weatherContent');
    const navWeather = document.getElementById('navWeather');
    
    try {
        // Using Open-Meteo (free, no API key required)
        // Kearney, Ontario coordinates: 45.5833° N, 79.3167° W
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=45.5833&longitude=-79.3167&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh&timezone=America/Toronto');
        
        if (!response.ok) throw new Error('Weather data unavailable');
        
        const data = await response.json();
        const current = data.current;
        
        // Weather code mapping
        const weatherCodes = {
            0: { desc: 'Clear sky', icon: '☀️' },
            1: { desc: 'Mainly clear', icon: '🌤️' },
            2: { desc: 'Partly cloudy', icon: '⛅' },
            3: { desc: 'Overcast', icon: '☁️' },
            45: { desc: 'Foggy', icon: '🌫️' },
            48: { desc: 'Foggy', icon: '🌫️' },
            51: { desc: 'Light drizzle', icon: '🌦️' },
            53: { desc: 'Drizzle', icon: '🌦️' },
            55: { desc: 'Heavy drizzle', icon: '🌧️' },
            61: { desc: 'Light rain', icon: '🌧️' },
            63: { desc: 'Rain', icon: '🌧️' },
            65: { desc: 'Heavy rain', icon: '⛈️' },
            71: { desc: 'Light snow', icon: '🌨️' },
            73: { desc: 'Snow', icon: '❄️' },
            75: { desc: 'Heavy snow', icon: '❄️' },
            77: { desc: 'Snow grains', icon: '❄️' },
            80: { desc: 'Light showers', icon: '🌦️' },
            81: { desc: 'Showers', icon: '🌧️' },
            82: { desc: 'Heavy showers', icon: '⛈️' },
            85: { desc: 'Light snow showers', icon: '🌨️' },
            86: { desc: 'Snow showers', icon: '❄️' },
            95: { desc: 'Thunderstorm', icon: '⛈️' },
            96: { desc: 'Thunderstorm with hail', icon: '⛈️' },
            99: { desc: 'Thunderstorm with hail', icon: '⛈️' }
        };
        
        const weather = weatherCodes[current.weather_code] || { desc: 'Unknown', icon: '🌡️' };
        
        // Update nav bar weather
        if (navWeather) {
            navWeather.innerHTML = `Kearney: ${Math.round(current.temperature_2m)}°C ${weather.icon}`;
        }
        
        // Update widget if it exists
        if (weatherContent) {
            weatherContent.innerHTML = `
            <div class="weather-icon">${weather.icon}</div>
            <div class="weather-temp">${Math.round(current.temperature_2m)}°C</div>
            <div class="weather-desc">${weather.desc}</div>
            <div class="weather-details">
                <div class="weather-detail">
                    <span>Humidity</span>
                    <strong>${current.relative_humidity_2m}%</strong>
                </div>
                <div class="weather-detail">
                    <span>Wind Speed</span>
                    <strong>${Math.round(current.wind_speed_10m)} km/h</strong>
                </div>
            </div>
        `;
        }
    } catch (error) {
        if (navWeather) {
            navWeather.innerHTML = 'Kearney';
        }
        if (weatherContent) {
            weatherContent.innerHTML = `
            <div class="weather-error" style="text-align: center; color: #78716C; padding: 20px 0;">
                Weather data currently unavailable
            </div>
        `;
    }
}

// Load weather on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWeather);
} else {
    loadWeather();
}

// Refresh weather every 30 minutes
setInterval(loadWeather, 30 * 60 * 1000);
