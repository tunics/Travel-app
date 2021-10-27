import { changeHeader, getPixabayKey } from "..";
import { updateUI } from "./uiUpdater";

const inputPlace = document.getElementById("place");
const inputDate = document.getElementById("travel-date");
const errorMsg = document.getElementById("error-msg");

const outlineError = "2px solid #f2799a";

let tripData = {};

//Get today date
const today = new Date();

//Disable previous dates from date picker selection
function disablePastDates() {
    try {
        inputDate.min = today.toISOString().split("T")[0];
    } catch (error) {
        console.log("error", error);
    }
}

disablePastDates();

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
    try {
        const response = await fetch("http://localhost:3000/keys");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getPlace(key, txt) {
    let geonamesURL = `http://api.geonames.org/searchJSON?q=${txt}&username=${key}`;

    try {
        const respGeonames = await fetch(geonamesURL);
        console.log(respGeonames.ok);
        const data = await respGeonames.json();

        tripData.place = {
            city: data.geonames[0].name,
            country: data.geonames[0].countryName,
            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng,
        };

        return data.geonames[0];
    } catch (error) {
        console.error(error);
    }
}

async function getWeather(key, location) {
    let weatherbitURL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${location.lat}&lon=${location.lng}&key=${key}`;
    const iconURL = "https://www.weatherbit.io/static/img/icons/";

    try {
        const respWeatherbit = await fetch(weatherbitURL);
        console.log(respWeatherbit.ok);
        const data = await respWeatherbit.json();

        tripData.weather = {
            temp: data.data[0].temp,
            maxTemp: data.data[0].max_temp,
            minTemp: data.data[0].min_temp,
            icon: iconURL + data.data[0].weather.icon + ".png",
            description: data.data[0].weather.description,
        };

        return data.data[0];
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

    tripData.dates = {
        date: dates.date,
        daysLeft: dates.daysLeft,
    };
    return dates;
}

async function handleSubmit(event) {
    event.preventDefault();
    tripData = [];

    errorMsg.style.display = "none"; // Hide error msg
    inputPlace.style.outline = "none";
    inputDate.style.outline = "none";

    let formText = inputPlace.value;
    let formDate = inputDate.value;

    if (formText != "" && formDate != "") {
        let keysObject = await getKeys();
        let place = await getPlace(keysObject.geonames, formText);
        let weather = await getWeather(keysObject.weatherbit, place);
        getDate(formDate);

        console.log(tripData);
        postData("http://localhost:3000/addEntry", {
            place: tripData.place,
            weather: tripData.weather,
            dates: tripData.dates,
        });

        let newHeader = await changeHeader(formText, getPixabayKey());

        updateUI();
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

export { handleSubmit, getKeys, postData };
