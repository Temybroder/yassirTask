const express = require('express');
const router = express.Router();
const request = require('request');
const {fetchAirQualityHelper} = require('../utils/requestHelper')(request); 
const dbClient = require('../../../vars/db')
const ApiError = require('../middlewares/errorManager')


// Welcome Page Route
router.get('/', (req, res) => {
    return res.status(200).json("Welcome to Yassir Air Quality testing API")
});

// Fetch Air Quality Route
router.get('/fetchAirQuality/:longitude/:latitude', (req, res, next) => {
    const {longitude, latitude} = req.params;
    fetchAirQualityHelper(longitude, latitude, (error, body) => {
        const Errormessage = "There was a problem with Your Request; we are working to resolve this.";
        const Errormessage2 = "System error; we are working to resolve this.";
          if(error){
              // Handle errors appropriately
                    next(ApiError.badClientRequest(Errormessage));
               }
          else {
                responseBody = JSON.parse(body);
                if (responseBody.status === "success"){
                   // Pick needed reponse data
                     const pollution = responseBody.data.current.pollution;
                     const payload = {
                                        "ts": pollution.ts, // Date of request 
                                        "aqius": pollution.aqius, // data for this from Response
                                        "mainus": pollution.mainus, // data for this from Response
                                        "maincn": pollution.maincn, // data for this from Response
                                    }
                                    dbClient.pollutionData.save(payload, function(err, savedPollutionData){
                                        if(err){
                                            res.status(400).json({message: err});
                                        }
                                        // Return in this format
                                            res.status(200).json({
                                                "Result": {
                                                    "Pollution" : savedPollutionData
                                                }
                                            })
                                    });
                         }  
                else {
                    next(ApiError.badClientRequest(Errormessage2))
                     }
                }
            })
        })


  module.exports = router;