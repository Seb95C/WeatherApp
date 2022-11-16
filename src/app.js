// Node core modules
const path = require('node:path')

// NPM modules
const hbs = require('hbs')

// App modules
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

// Path management
const staticDirPath = path.join(__dirname, '../static')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setting up Express server
const express = require ('express')
const app = express()
const port = 3000

// Configure static content
app.use(express.static(staticDirPath))

// Configure HBS View Engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Route Handelers 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress){
        return res.send({
            error: 'Must provide an adress'
        })
    }

    res.send({
        forecast: `All is fine in ${req.query.adress}`,
        location: req.query.adress,
        adress: req.query.adress
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found!'
    })
})

// Server start-up
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

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