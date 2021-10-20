import { changeHeader, getPixabayKey } from "..";

function start(txt) {
    // Client.changeHeader(txt, Client.getPixabayKey());
}

function handleSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById("place-txt").value;
    console.log(formText);
}

export { handleSubmit };

changeHeader("bikini", getPixabayKey());
export { start };
