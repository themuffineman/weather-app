function getWeather(){
    const apiKey = '22e9f6656238e85b6a8fdd9c5a73c5ac';
    const city = document.getElementById('city').value;

    if (!city){
        alert('Please Enter City');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error Fetching current weather data:', error);
            alert('Error fetching current weatehr data. Please Try Again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForcast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please Try Again.');
        });

        function displayWeather(data){
            const tempDivInfo = document.getElementById('temp-div');
            const weatherInfoDiv = document.getElementById('weather-info');
            const hourlyForecastDiv = document.getElementById('hourly-forecast');
        
            weatherInfoDiv.innerHTML = '';
            hourlyForecastDiv.innerHTML= '';
            tempDivInfo.innerHTML = '';
        
            if (data.cod === '404'){
                weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
            }
            else{
                const cityName = data.name;
                const temperature = Math.round(data.main.temp - 273.15);
                const description = data.weather[0].description;
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        
                const temperatureHTML = `<p>${temperature}°C</p>`;
                const weatherHtml = `<p>${cityName}</p> <p>${description}</p>`;
        
                tempDivInfo.innerHTML = temperatureHTML;
                weatherInfoDiv.innerHTML = weatherHtml;
                weatherIcon.src = iconUrl;
                weatherIcon.alt = description;
        
                showImage();
            }
        }
        function displayHourlyForcast(hourlyData){
            const hourlyForecastDiv = document.getElementById('hourly-forecast');
            const next24Hours = hourlyData.slice(0,8);
        
            next24Hours.forEach(item => {
                const dateTime = new Date(item.dt *1000);
                const hour = dateTime.getHours();
                const temperature = Math.round(item.main.temp - 273.15);
                const iconCode = item.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        
                const hourlyItemHtml = `
                <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon"
                <span>${temperature}°C</span>
                <div>`;
        
                hourlyForecastDiv.innerHTML += hourlyItemHtml;
            });
        
            function showImage(){
                const weatherIcon = document.getElementById('weather-icon');
                weatherIcon.style.display = 'block';
            }
        }
        
}
