var cron = require('node-cron');
const request = require('request');
const dbClient = require('../vars/db');
const {fetchAirQualityHelper} = require('../api/v1/utils/requestHelper')(request); 


const cron_job = (req, res) => { 

let oldPollutionData = undefined; // Using US-standard Air Quality Index
const cron_task = (request, response) => {
         const longitude = 2.352222;
         const latitude = 48.856613;
         fetchAirQualityHelper(longitude, latitude, (error, body, res) => {
            const Errormessage = "There was a problem with Your Request; we are working to resolve this.";
              if(error){
                  // Handle errors appropriately
                  return  res.status(400).json({message: Errormessage});
                  } 
              else {
                    serverResponse = JSON.parse(body);     
                    if (serverResponse.status === "success"){
                         // Pick needed serverResponse data
                         const pollution = serverResponse.data.current.pollution;
                         const payload = {
                                            "fetchTimeStamp": {
                                              "date": new Date(`${pollution.ts}`).toLocaleDateString(), // Date of request 
                                              "time": new Date(`${pollution.ts}`).toLocaleTimeString(), // Exact time of request 
                                            },
                                            "aqius": pollution.aqius, // data for this from Response
                                            "mainus": pollution.mainus, // data for this from Response
                                            "aqicn": pollution.aqicn, // data for this from Response
                                            "maincn": pollution.maincn, // data for this from Response
                                        }
                                      
                                        dbClient.pollutionData.save(payload, function(err, savedAirQualityData){
                                            if(err){
                                                return response.statusCode(400).json({message: err});
                                              }
                                              // Return in this format
                                                return response.status(200).json({
                                                    "Result": {
                                                        "Pollution" : savedAirQualityData
                                                    }
                                              })
                                        });
                             }  
                    else {
                        return  response.status(400).json({message: Errormessage});
                         }
                    }
               })
        }

 cron.schedule('*/1 * * * *', () =>  {
    cron_task();
  }, {
    scheduled: true
  });
}
module.exports = cron_job;