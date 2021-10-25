async function updateUI() {
    const placeTxt = document.getElementById("place-txt");
    const dateTxt = document.getElementById("date-txt");
    const daysLeftTxt = document.getElementById("days-left-txt");

    const respPlace = await fetch("http://localhost:3000/place");
    const respWeather = await fetch("http://localhost:3000/weather");
    const respDates = await fetch("http://localhost:3000/dates");

    let resp = {};

    try {
        resp = resp.push(await respPlace.json());
        resp = resp.push(await respWeather.json());
        resp = resp.push(await respDates.json());

        console.log(resp);
    } catch (error) {
        console.error(error);
    }
}

export { updateUI };
