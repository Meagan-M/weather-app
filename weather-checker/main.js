async function locationSearch(woeid) {
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();
        const today = data.consolidated_weather[0];
        console.log(`The high and low today in ${data.title} is ${today.min_temp} and ${today.max_temp}`);
    } catch(error) {
        console.log(error);
    }
}
    
locationSearch(2487956);