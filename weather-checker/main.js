let locationResult = document.getElementById('result');
let forecastH3 = document.getElementById('result-h3');

// let error = document.getElementById('error-message');
let dailyInfo = document.getElementById('result-p');
let cityname = document.getElementById('search-form').addEventListener('submit', handleSubmit);


function handleSubmit(event) {
    event.preventDefault();
    const userInput = document.getElementById("search-input").value;
    console.log(userInput);
    cityName(userInput);
};


async function cityName(cityname) {
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${cityname}`);
        console.log(result);
        const cityData = await result.json();
        const cityWoeID = cityData[0].woeid;
        console.log('woeid', cityWoeID);
        locationSearch(cityWoeID);
    } catch(error) {
        locationResult.innerHTML = `No data is available for this city`;
        console.log(error);
    }
}



async function locationSearch(woeid) {
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();
        console.log('locationsearch', data);
        locationResult.innerHTML += `<h3 class= 'result-h3'>${data.title} Five-Day Forecast</h3>`;
        
        for (let i = 0; i <= data.consolidated_weather.length; i++) {
            const max_tempRounded = Math.round(data.consolidated_weather[i].max_temp);
            const date = (data.consolidated_weather[i].applicable_date);
            const weatherState = (data.consolidated_weather[i].weather_state_name);
            const min_tempRounded = Math.round(data.consolidated_weather[i].min_temp);

            locationResult.innerHTML += `<h3 class='date-h3'>${date} </h3> <p class= 'result-p'>${weatherState}</p><p class= 'result-p'> High: ${max_tempRounded} C</p> <p class= 'result-p'> Low: ${min_tempRounded} C</p>`;
            console.log();
        }
    } catch(error) {
        
    }
}

