const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWluY2hhbmp1biIsImEiOiJjazljNDV6M20wMTJ5M29vN3A4dWg1dzlhIn0.2J3VXAvpULgCiDq9trhMYw&limit=1'
    // ? becomes %3F in encodeURIComponent

    request({url, json: true}, (error, { body }) =>{
        if(error){
            callback('Unable to connect to the service', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name 
            })
        }
    })

}

module.exports = geocode;