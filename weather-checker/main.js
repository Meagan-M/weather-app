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
        const min_tempRounded = Math.round(data.consolidated_weather[0].min_temp);
        const max_tempRounded = Math.round(data.consolidated_weather[0].max_temp);
        locationResult.innerHTML = `The high and low today in ${data.title} is ${min_tempRounded} celsius and ${max_tempRounded} celsius`;
    } catch(error) {
        
    }
}

