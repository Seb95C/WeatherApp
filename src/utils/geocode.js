const request = require('postman-request')
const fs = require('fs')

const key = fs.readFileSync('positionstack.txt').toString()

const geocode = (adress, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=${key}&query=${encodeURIComponent(adress)}`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            fs.appendFileSync('log.txt', `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}@${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s: Error: ${JSON.stringify(error)}\n`)
            callback('Failed to connect to positionstack.com API', undefined)
        } else if (response.body.error || response.body.data[0].length === 0) {
            const date = new Date(Date.now())
            fs.appendFileSync('log.txt', `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}@${date.getHours()}h ${date.getMinutes()}m ${date.getSeconds()}s: Error: ${response.body.error ? JSON.stringify(response.body.error) : response.body.error}
            Body: ${response.body.data ? JSON.stringify(response.body.data) : response.body.data}\n`)
            callback('Bad response from positionstack.com API. Check adress name. If adress name is correct, please retry as this might be a positionstack.com internal issue.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
                label: response.body.data[0].label
            })
        }
    })
}

module.exports = geocode