const request = require('postman-request')
const fs = require('fs')

// Used to load private API key. The file containig the key is not included in the git repository for safety reasons.
// Create account and get an API key at positionstack.com. Create positionstack.txt file in main folder and paste your key 
const key = fs.readFileSync('positionstack.txt').toString()

const geocode = (adress, callback) => {

    // Generate the URL to be used for the API call
    const url = `http://api.positionstack.com/v1/forward?access_key=${key}&query=${encodeURIComponent(adress)}`

    // Make the API call to positionstack.com
    request({ url: url, json: true }, (error, response) => {

        // Check for low level errors
        if (error) {

            // Pass in error to the callback function
            callback('Failed to connect to positionstack.com API', undefined)

        // Check for bad response from server. This can either be an error or an inadequate JSON response (ex. empty data array)
        } else if (response.body.error || response.body.data[0].length === 0) {
            
            // Due to high unreliability of positionstack, a log file has been created to determine the point of failure and check for te returned JSON
            // The exact time and any relevat information are logged to log.txt file
            const date = new Date(Date.now())
            fs.appendFileSync('log.txt', `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}@${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s: Error: ${response.body.error ? JSON.stringify(response.body.error) : response.body.error}
            Body: ${response.body.data ? JSON.stringify(response.body.data) : response.body.data}\n`)

            // Pass in an error to the callback function
            callback('Bad response from positionstack.com API. Check adress name. If adress name is correct, please retry as this might be a positionstack.com internal issue.', undefined)
        } else {

            // Pass in a response object to the callback function containing complete name of location (label) and lat/long values
            callback(undefined, {
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
                label: response.body.data[0].label
            })
        }
    })
}

module.exports = geocode