const request = require('postman-request')
const fs = require('fs')

const key = fs.readFileSync('weatherstack.txt').toString()

const weather = (coordinates, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${coordinates.latitude},${coordinates.longitude}`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weatherstack.com API', undefined)
        } else if (response.body.error) {
            callback('Wrong input for weatherstack.com API', response.body.error)
        } else {
            callback(undefined, `${response.body.current.weather_descriptions}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees`)
        }
    })
}

module.exports = weather