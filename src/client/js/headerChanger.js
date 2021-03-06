const headerImg = document.getElementById("travel-img");
const pixabayUrl = "https://pixabay.com/api/?key=";
const genericTerms = "travel+airplane"; //used to get generic image

async function getPixabayKey() {
    const axios = require("axios");
    try {
        const response = await axios.get("http://localhost:3000/keys");
        return response.data.pixabay;
    } catch (error) {
        console.error(error);
    }
}

async function getPixabayResp(key, imgTxt) {
    imgTxt = imgTxt.replace(/ /g, ""); //remove white spaces from names

    let apiUrl =
        pixabayUrl + key + "&q=" + imgTxt + "&image_type=photo&cat=travel";

    const genericImage =
        pixabayUrl +
        key +
        "&q=" +
        genericTerms +
        "+wing&image_type=photo&pretty=true";

    const axios = require("axios");
    try {
        const response = await axios.get(apiUrl);
        if (response.data.total > 0) {
            return response.data.hits[0].largeImageURL;
        } else {
            const response = await axios.get(genericImage);
            return response.data.hits[0].largeImageURL;
        }
    } catch (error) {
        console.error(error);
    }
}

async function changeHeader(imgTxt, key) {
    key.then((res) => {
        return res;
    })
        .then((res) => {
            const imgURL = getPixabayResp(res, imgTxt).then((img) => {
                return img;
            });
            return imgURL;
        })
        .then((imgURL) => {
            headerImg.src = imgURL;
        });
}

changeHeader("travel", getPixabayKey()); // Load first image

export { changeHeader, getPixabayKey, getPixabayResp };
