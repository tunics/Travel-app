import { changeHeader, getPixabayKey } from "..";

function start(txt) {
    // Client.changeHeader(txt, Client.getPixabayKey());
}

function handleSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById("place-txt").value;
    let formDate = document.getElementById("travel-date").value;
    console.log("Place: " + formText + " Date: " + formDate);
}

changeHeader("bikini", getPixabayKey());
export { start, handleSubmit };
