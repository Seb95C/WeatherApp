const request = require('postman-request')

// Get API key from environmetn variable
const key = process.env.WEATHERSTACKAPIKEY

// Destructure latitude and longitude data from the input object
const weather = ({ latitude, longitude }, callback) => {

    // Generate the URL to be used for the API call
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}`

    // Make the API call to weatherstack.com
    // Destructure response object to access just the body object
    request({ url, json: true }, (error, { body }) => {

        // Check for low level errors
        if (error) {

            // Pass in error
            callback('Unable to connect to weatherstack.com API', undefined)

        // Chack for server errors
        } else if (body.error) {

            // Pass in error
            callback('Wrong input for weatherstack.com API', undefined)
        } else {

            // Pass in a respunse string to the callback function
            callback(undefined, `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees`)
        }
    })
}

module.exports = weather