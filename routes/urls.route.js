const express = require("express");
const axios = require('axios');
require('dotenv').config();
const { UrlModel } = require("../models/url.model");
const { authenticate } = require("../middlewares/Authenticate.middleware");
const urlRouter = express.Router();

const apiKey = process.env.apiKey || "F4SC6V5JvqGjSqnp10hv1dUrQwG1PoB6QkP7mt5cV9HfA";


// controller for shortening urls
urlRouter.post("/shorten",authenticate,async (req, res) => {
    const { longUrl } = req.body;
    const user= req.body.userid;
    try {
        const urlExist = await UrlModel.findOne({LongUrl:longUrl});
        if(urlExist){
            return res.status(200).send({"msg":`Short url for this url has already been created `,"Short url":`${urlExist.shortURL}`})
        }
        const shortUrl = await myfunc(apiKey, longUrl);
        if (shortUrl) {
            const data = new UrlModel({ LongUrl: longUrl, shortURL: shortUrl , userID:user});
            await data.save();
            res.status(200).send({
                "msg": "Short url has been created successfully",
                "LongURL": `${longUrl}`,
                "shortenedURL": `${shortUrl}`
            });
        } else {
            res.status(202).send({ "msg": "Failure in creating shortURL" });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Function for making a axios post request to api gfor shortening provided  Long url.
function myfunc(key, longUrl) {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://shrtlnk.dev/api/v2/link';

        const requestData = {
            url: longUrl
        };

        const headers = {
            'api-key': key,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        axios.post(apiUrl, requestData, { headers })
            .then(response => {
                console.log(response.data);
                resolve(response.data.shrtlnk);
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
                reject(error);
            });
    });
}

module.exports = {
    urlRouter
};
