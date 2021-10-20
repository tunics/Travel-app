const headerImg = document.getElementById("travel-img");
const pixabayUrl = "https://pixabay.com/api/?key=";

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
    console.log("Api URL AQUI: " + apiUrl);

    const genericImage =
        pixabayUrl +
        key +
        "&q=travel+airplane+wing&image_type=photo&pretty=true";

    const axios = require("axios");
    try {
        const response = await axios.get(apiUrl);
        if (response.data.total > 0) {
            console.log(
                "URL da imagem: " + response.data.hits[0].largeImageURL
            );
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
