let locationResult = document.getElementById('result');
let cityname = document.getElementById('search-form').addEventListener('submit', handleSubmit);


function handleSubmit(event) {
    event.preventDefault();
    const userInput = document.getElementById("search-input").value;
    cityName(userInput);
};


async function cityName(cityname) {
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${cityname}`);
        const cityData = await result.json();
        const cityWoeID = cityData[0].woeid;
        
        locationSearch(cityWoeID);
    } catch(error) {
        locationResult.innerHTML = `No data is available for this city`;
        
    }
}



async function locationSearch(woeid) {
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();

        locationResult.innerHTML += `<h3>${data.title} Five-Day Forecast</h3>`;
        
        for (let i = 0; i <= data.consolidated_weather.length; i++) {
            const max_tempRounded = Math.round(data.consolidated_weather[i].max_temp);
            const date = (data.consolidated_weather[i].applicable_date);
            const weatherState = (data.consolidated_weather[i].weather_state_name);
            const min_tempRounded = Math.round(data.consolidated_weather[i].min_temp);
            
            console.log(max_tempRounded);
            locationResult.innerHTML += `<p>${date} ${weatherState} High ${max_tempRounded} Celsius Low ${min_tempRounded} Celsius </p>`;
        }

        
        
        
        
        
        // if (max_tempRounded <= 16) {
        //     
        // } else {
        //     
        // }
    } catch(error) {
        
    }
}

