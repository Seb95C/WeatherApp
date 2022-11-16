// Node core modules
const path = require('node:path')

// NPM modules

// App modules
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

// Path management
const staticDirPath = path.join(__dirname, '../static')

// Setting up Express server
const express = require ('express')
const app = express()
const port = 3000

// Configure static content
app.use(express.static(staticDirPath))


// Route Handelers 
app.get('', (req, res) => {
    res.send('Hello Express!')
})


// Server start-up
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

// Deprecated! Location will be received via HTTP request
//const location = process.argv[2]

// Deprecated! Location will be checked inside the handler
// If no valid adress is provided, the application will terminate execution
// if (!location) {
//     return console.log('Please add a location when running the application via command line arguments.\nExample: node src/app.js London')
// }


// Code is deactivated temporarely for the purpose of developing the Express server
// geocode(location, (error, data) => {
//     if (error) { 
//         return console.log('Error', error)
//     }
    
//     // Call weather function with data (containing latitude, longitude)
//     // Label property is not used by weather. Kept like this for clarity of code
//     // weather() will destructure data to only use latitude and longitude
//     weather(data, (error, forecast) => {
//         if (error) { 
//             return console.log('Error', error)
//         }
        
//         // Display full location name
//         console.log(data.label)

//         // Display response string containing description and temperature values
//         console.log(forecast)
//     })
// })