const requestHelper = (request) => {

    const apiKey = 'fbf7539b-54b9-4ae7-a94b-56eaa2e48ec8';

    const fetchAirQualityHelper = (longitude, latitude, mycallback) => {
        const options = {
            'method': 'GET',
            url: `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${apiKey}`,
            headers : {
               // authorization: apiKey,
                'content-type': 'application/json'
            }
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request(options, callback)
    }
    return {fetchAirQualityHelper};
}
module.exports = requestHelper;