let deg; 

function fetchWeather() {
    const city= document.getElementById("cityInput").value;
    const apiKey = "df685b195ca42e1ec4e4044d09262e80";

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            const currentWeather = document.getElementById('currentWeather');
            const Ctemp = data.main.temp;
            const CtempCelcius = Math.round(Ctemp)+"°C";
        

            if (data.weather[0].main === "Rain") {
                currentWeather.innerHTML = `
                <div class="current-weather-item">
                <h1>Current Weather</h1>
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <h3>${data.weather[0].description}</h3>

                    <img src= "../images/rain.png"></img>

                    <p> ${CtempCelcius}</p>
                    
                </div>
            `;

                
            }else if (data.weather[0].main === "Drizzle") {
                currentWeather.innerHTML = `
                <div class="current-weather-item">
                <h1>Current Weather</h1>
                    <h2> ${data.name}, ${data.sys.country}</h2>
                    <h3>${data.weather[0].description}</h3>

                    <img src= "../images/snow.png"></img>

                    <p> ${CtempCelcius}</p>
                </div>
            `;
            
        
            } else if (data.weather[0].main === "Clouds") {
                currentWeather.innerHTML = `

                <div class="current-weather-item">
                <h1>Current Weather</h1>
                    <h2> ${data.name}, ${data.sys.country}</h2>
                    <h3>${data.weather[0].description}</h3>

                    <img src="../images/clouds.png"></img>

                    <p> ${CtempCelcius}</p>
                </div>
            `;
            
            }   else if (data.weather[0].main === "Clear") {
                currentWeather.innerHTML = `

                <div class="current-weather-item">
                <h1>Current Weather</h1>
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <h3>${data.weather[0].description}</h3>

                    <img src="../images/clear.png"></img>

                    <p>${CtempCelcius}</p>
                </div>
            `;
            
        
            } else if (data.weather[0].main === "Mist") {
                currentWeather.innerHTML = `

                <div class="current-weather-item">
                <h1>Current Weather</h1>
                    <h2> ${data.name}, ${data.sys.country}</h2>
                    <h3>${data.weather[0].description}</h3>

                    <img src="../images/mist.png"></img>

                    <p>${data.weather[0].description}</p>
                    <p>${CtempCelcius}</p>
                </div>
            `;
            
            } 
            deg = CtempCelcius;


        
        })
        .catch(error => console.log('Error fetching current weather:', error));

    // Fetch 5-day forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00')); 
            const forecastContainer = document.getElementById('forecast');
            forecastContainer.innerHTML = '';

            forecast.forEach(item => {
                const date = new Date(item.dt * 1000);
                const day = date.toLocaleDateString('en-US', { weekday: 'long' });
                const temp = item.main.temp;
                const tempCelcius = Math.round(temp)+"°C";

                const description = item.weather[0].description;

            
                if (item.weather[0].main === "Rain") {
                    forecastContainer.innerHTML += `
                    <div class="forecast-item">
                        <h3>${day}</h3>
                        <img src= "../images/rain.png"></img>
                        <p>${description}</p>
                        <p>Temperature: ${tempCelcius}</p>
                    </div>
                `;
                    
                }else if (item.weather[0].main === "Drizzle") {
                    forecastContainer.innerHTML += `
                    <div class="forecast-item">
                        <h3>${day}</h3>
                        <img src= "../images/snow.png"></img>
                        <p>${description}</p>
                        <p>Temperature: ${tempCelcius}</p>
                    </div>
                `;
                
            
                } else if (item.weather[0].main === "Clouds") {
                    forecastContainer.innerHTML += `
                    <div class="forecast-item">
                        <h3>${day}</h3>
                        <img src="../images/clouds.png"></img>
                        <p>${description}</p>
                        <p>Temperature: ${tempCelcius}</p>
                    </div>
                `;
                
                }   else if (item.weather[0].main === "Clear") {
                    forecastContainer.innerHTML += `
                    <div class="forecast-item">
                        <h3>${day}</h3>
                        <img src="../images/clear.png"></img>
                        <p>${description}</p>
                        <p>Temperature: ${tempCelcius}</p>
                    </div>
                `;
                
            
                } else if (item.weather[0].main === "Mist") {
                    forecastContainer.innerHTML += `
                    <div class="forecast-item">
                        <h3>${day}</h3>
                        <img src="../images/mist.png"></img>
                        <p>${description}</p>
                        <p>Temperature: ${tempCelcius}</p>
                    </div>
                `;
                
                } 
            
            
            });

        
        })
        .catch(error => console.log('Error fetching forecast:', error));
}
