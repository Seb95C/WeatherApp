const request = require('postman-request')

// Get API key from environmetn variable
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

const reverseGeocode = ({ latitude, longitude }, callback) => {
    // Generate URL for API call
    const url = `http://api.positionstack.com/v1/reverse?access_key=${key}&query=${latitude},${longitude}`

    // Execute API call
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            return callback('Failed to connect to positionstack.com API', undefined)
        }

        if (body.error || body.data[0].length === 0) {
            return callback('Unable to find location! Try again!', undefined)
        }

        callback(undefined, {
            label: body.data[0].label
        })
    })
}

module.exports = {
    geocode,
    reverseGeocode
}