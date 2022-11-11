const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

geocode('Dubai', (error, data) => {
    if (error) { 
        return console.log('Error', error)
    }
    
    // Display full location name
    console.log(data.label)

    // Call weather function with data (containing latitude, longitude)
    // Label property is not used by weather. Kept like this for clarity of code
    weather(data, (error, data) => {
        if (error) { 
            return console.log('Error', error)
        }
        
        // Display response string containing description and temperature values
        console.log(data)
    })
})