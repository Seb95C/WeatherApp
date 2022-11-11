const request = require('postman-request')
const fs = require('fs')

// Used to load private API key. The file containig the key is not included in the git repository for safety reasons.
// Create account and get an API key at weatherstack.com. Create weatherstack.txt file in main folder and paste your key 
const key = fs.readFileSync('weatherstack.txt').toString()

const weather = (coordinates, callback) => {

    // Generate the URL to be used for the API call
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${coordinates.latitude},${coordinates.longitude}`

    // Make the API call to weatherstack.com
    request({ url: url, json: true }, (error, response) => {

        // Check for low level errors
        if (error) {

            // Pass in error
            callback('Unable to connect to weatherstack.com API', undefined)

        // Chack for server errors
        } else if (response.body.error) {

            // Pass in error
            callback('Wrong input for weatherstack.com API', undefined)
        } else {

            // Pass in a respunse string to the callback function
            callback(undefined, `${response.body.current.weather_descriptions}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees`)
        }
    })
}

module.exports = weather