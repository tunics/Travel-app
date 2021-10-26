async function updateUI() {
    const tripTxt = document.getElementById("trip");
    const placeTxt = document.getElementById("place-txt");
    const dateTxt = document.getElementById("date-txt");
    const daysLeftTxt = document.getElementById("days-left-txt");
    const weatherTxt = document.getElementById("weather-txt");
    const minMaxTxt = document.getElementById("min-max-txt");
    const conditionTxt = document.getElementById("condition-txt");
    const weatherIcon = document.getElementById("weather-icon");
    const anotherTripTxt = document.getElementById("another-txt");

    tripTxt.style.display = "block";

    try {
        const resp = await fetch("http://localhost:3000/allEntries");
        console.log(resp.ok);
        const data = await resp.json();

        console.log(`My trip to: ${data.place.city}, ${data.place.country}`);

        placeTxt.innerHTML = `My trip to: ${data.place.city}, ${data.place.country}`;
        dateTxt.innerHTML = `Departing: ${data.dates.date}`;
        daysLeftTxt.innerHTML = `${data.place.city} is ${data.dates.daysLeft} days away.`;
        weatherTxt.innerHTML = `The weather now is: ${data.weather.temp}ºC`;
        minMaxTxt.innerHTML = `Max: ${data.weather.maxTemp}ºC, Min: ${data.weather.minTemp}ºC`;
        conditionTxt.innerHTML = data.weather.description;
        weatherIcon.src = data.weather.icon;
        weatherIcon.alt = data.weather.description;

        anotherTripTxt.style.display = "block";
        anotherTripTxt.innerHTML = "Plan another trip: ";
    } catch (error) {
        console.error(error);
    }
}

export { updateUI };
