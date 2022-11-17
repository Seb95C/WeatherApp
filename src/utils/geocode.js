const request = require('postman-request')
const fs = require('fs')

// Used to load private API key. The file containig the key is not included in the git repository for safety reasons.
// Create account and get an API key at positionstack.com. Create positionstack.txt file in main folder and paste your key 
//const key = fs.readFileSync('positionstack.txt').toString()
const key = process.env.POSITIONSTACKAPIKEY

const geocode = (adress, callback) => {

    // Generate the URL to be used for the API call
    const url = `http://api.positionstack.com/v1/forward?access_key=${key}&query=${encodeURIComponent(adress)}`

    // Make the API call to positionstack.com
    // Destructure response object to access just the body object
    request({ url, json: true }, (error, { body }) => {

        // Check for low level errors
        if (error) {

            // Pass in error to the callback function
            callback('Failed to connect to positionstack.com API', undefined)

        // Check for bad response from server. This can either be an error or an inadequate JSON response (ex. empty data array)
        } else if (body.error || body.data[0].length === 0) {

            // Pass in an error to the callback function
            callback('Unable to find location! Try again!', undefined)
        } else {

            // Pass in a response object to the callback function containing complete name of location (label) and lat/long values
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                label: body.data[0].label
            })
        }
    })
}

module.exports = geocode