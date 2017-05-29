/*
In order to clean up the spider code [basically a call back hell]- need to perform the
following:
1. return back as soon as error occurs.
2. create functions instead of if/else conditions.
3. modularize the code
*/
'use strict';
const fs = require("fs");
const request = require("request");
const mkdirp = require('mkdirp');
const path = require('path');

function spider(url, fileName, callback) {
    fs.exists(fileName, function(exists) {
        if (exists)
            callback(null, fileName);

        else {
            downloadSaveFile(url, fileName, callback);
        }
    })

}

function downloadSaveFile(url, fileName, callback) {
    request(url, (error, response, body) => {
        if (error) {
            callback(error, null);
            return;
        } else {
            saveFile(body, fileName, callback);
        }
    })
}

function saveFile(data, fileName, callback) {
    mkdirp(path.dirname(fileName), err => {
        if (err) {
            callback(err, null)
        } else {
            fs.writeFile(fileName, data, err => {
                if (err) {
                    callback(err, null)
                } else {
                    console.log("created file...");
                    callback(null, fileName);
                }
            })
        }
    })
}

spider("http://www.google.com", "google_optimized.txt", function(err, data) {
    if (err) {
        console.log("error in scraping web:" + err);
    } else {
        console.log("File created or was already available:" + data);
    }
})