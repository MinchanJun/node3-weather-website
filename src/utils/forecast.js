const request = require('request')

// Goals: add new data to forecast

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b0e8413d97d405d826df0313a586c2a6&query=' + lat + ',' + lon + '&units=f'
    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to the server', undefined)
        }
        else if(body.error){
            callback('Unable to find a location', undefined)
        }
        else{
            //Two ways of calling back
            //1st way
            callback(undefined, 'Current Temperature: ' + body.current.temperature + ' degrees.' +
                        ' It feels like: ' + body.current.feelslike +' degrees. ' + 
                        'Current Weather Data: ' + body.current.weather_descriptions[0] + '.' +
                        ' Humidity is: ' + body.current.humidity + '%')
            // 2nd way
            // callback(undefined, {
            //      temperature: response.body.current.temperature,
            //      weather: response.body.current.weather_descriptions[0],
            //      region: response.body.location.region,
            //      feelslike: response.body.current.feelslike
                               
            // })
            
        }
    })
}

module.exports = forecast
