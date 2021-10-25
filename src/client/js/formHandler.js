import { changeHeader, getPixabayKey } from "..";
import { updateUI } from "./uiUpdater";

const inputPlace = document.getElementById("place-txt");
const inputDate = document.getElementById("travel-date");
const errorMsg = document.getElementById("error-msg");
const outlineError = "2px solid #f2799a";

//Get today date
const today = new Date();

//Disable previous dates from date picker selection
inputDate.min = today.toISOString().split("T")[0];

// Async POST
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

async function getKeys() {
    const response = await fetch("http://localhost:3000/keys");
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getPlace(key, txt) {
    let geonamesURL = `http://api.geonames.org/searchJSON?q=${txt}&username=${key}`;

    const respGeonames = await fetch(geonamesURL);
    try {
        const data = await respGeonames.json();
        postData("http://localhost:3000/place", {
            city: data.geonames[0].name,
            country: data.geonames[0].countryName,
            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng,
        });

        //to get weather
        let latLong = {
            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng,
        };
        console.log(data.geonames[0].name);
        return latLong;
    } catch (error) {
        console.error(error);
    }
}

async function getWeather(key, location) {
    let weatherbitURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${location.lat}&lon=${location.lng}&key=${key}`;
    const iconURL = "https://www.weatherbit.io/static/img/icons/";

    const respWeatherbit = await fetch(weatherbitURL);
    try {
        const data = await respWeatherbit.json();
        console.log(data.data[0]);
        postData("http://localhost:3000/weather", {
            temp: data.data[0].temp,
            maxTemp: data.data[0].max_temp,
            minTemp: data.data[0].min_temp,
            icon: iconURL + data.data[0].weather.icon + ".png",
            description: data.data[0].weather.description,
        });
        return data.data[0].max_temp;
    } catch (error) {
        console.error(error);
    }
}

async function getDate(date) {
    let selectedDate = new Date(date);
    selectedDate.setMinutes(selectedDate.getTimezoneOffset()); //fix UTC timezone

    let daysLeft = Math.floor(
        (selectedDate - today) / (24 * 60 * 60 * 1000) + 1
    );

    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    let formattedDate = selectedDate.toLocaleDateString(undefined, options);

    let dates = {
        date: formattedDate,
        daysLeft: daysLeft,
    };

    postData("http://localhost:3000/dates", {
        date: dates.date,
        daysLeft: dates.daysLeft,
    });

    console.log("Date after click: " + dates.date);
    console.log("Today is: " + today);
    console.log(dates.daysLeft);

    return dates;
}

async function handleSubmit(event) {
    event.preventDefault();

    errorMsg.style.display = "none"; // Hide error msg
    inputPlace.style.outline = "none";
    inputDate.style.outline = "none";

    let formText = inputPlace.value;
    let formDate = inputDate.value;

    if (formText != "" && formDate != "") {
        console.log("Place: " + formText + " Date: " + formDate);

        try {
            let keysObject = await getKeys();
            let placeLocation = await getPlace(keysObject.geonames, formText);
            getDate(formDate);
            let weather = await getWeather(
                keysObject.weatherbit,
                placeLocation
            );
            let newHeader = await changeHeader(formText, getPixabayKey());

            const logInfo = async (a, b) => {
                console.log(a, b);
            };

            logInfo("teste: ", weather);

            updateUI();
        } catch {
            console.error(error);
        }
    } else if (formText != "" && formDate == "") {
        errorMsg.style.display = "block";
        inputDate.style.outline = outlineError;
        errorMsg.innerHTML = "Please, select a date!";
    } else {
        errorMsg.style.display = "block";
        errorMsg.innerHTML = "Please, select a place!";
        inputPlace.style.outline = outlineError;
    }
}

export { handleSubmit };
