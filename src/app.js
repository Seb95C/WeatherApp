const request = require('postman-request')
const fs = require('fs')

const adress = 'New York'

const weatherstackKey = fs.readFileSync('weatherstack.txt').toString()
const positionstackKey = fs.readFileSync('positionstack.txt').toString()
const urlPosition = `http://api.positionstack.com/v1/forward?access_key=${positionstackKey}&query=${adress}`


request({ url: urlPosition, json: true }, (error, response) => {
    if(error) {
        fs.appendFileSync('log.txt', `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}@${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s: Error: ${JSON.stringify(error)}\n`)
        console.log('Failed to connect to positionstack.com API')
    } else if (response.body.error || response.body.data[0].length === 0) {
        console.log('Bad response from positionstack.com API. Check adress name. If adress name is correct, please retry as this might be a positionstack.com internal issue.')
        const date = new Date(Date.now())
        fs.appendFileSync('log.txt', `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}@${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s: Error: ${response.body.error ? JSON.stringify(response.body.error) : response.body.error}
        Body: ${response.body.data ? JSON.stringify(response.body.data) : response.body.data}\n`)
    } else {
        const location = response.body.data[0]
        console.log(location.latitude)
        console.log(location.longitude)
        console.log(location.label)

        const urlWeather = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${location.latitude},${location.longitude}`

        request({ url: urlWeather, json: true }, (error, response) => {
            if (error) {
                console.log('Unable to connect to weatherstack.com API')
            } else if (response.body.error) {
                console.log('Wrong input for weatherstack.com API')
            } else {
                console.log(`${response.body.current.weather_descriptions}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees`)
            }
        })
    }
})