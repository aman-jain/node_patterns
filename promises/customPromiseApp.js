'use strict';

const utilities = require("./utilities");
const request = utilities.promisify(require("request"))

function download() {
    const url = "http://www.google.com";
    request(url)
        .then((response) => {

            const body = response.body;
            console.log(body);
        })
        .catch(err => console.log(err))
}
download();