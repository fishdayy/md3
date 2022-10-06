axios = require("axios");

function getJSONAPI() {
    return new Promise(function (resolve) {
        axios.get('https://api.nasa.gov/planetary/apod', {
            params: {
                api_key: '7dWSNOUczqbbmH5yCbflHcOGZaebp6VAcNOo6Dw9'
            }
        })
            .then(function (json) {
                resolve(json.data)
            })
    })
}

getJSONAPI().then(result => {
    console.log(result);
})