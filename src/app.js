const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

geocode('Dubai', (error, data) => {
    if (error) { 
        console.log('Error', error)
    } else { 
        console.log(data.label)

        weather(data, (error, data) => {
            if (error) { 
                console.log('Error', error)
            } else { 
                console.log(data)
            }
        })
    }
})