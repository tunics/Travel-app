import { changeHeader, getPixabayKey } from "..";

const isToday = (someDate) => {
    const today = new Date();
    return (
        someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
    );
};

function handleSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById("place-txt").value;
    let formDate = document.getElementById("travel-date").value;
    console.log("Place: " + formText + " Date: " + formDate);

    changeHeader(formText, getPixabayKey());
}

export { handleSubmit };
