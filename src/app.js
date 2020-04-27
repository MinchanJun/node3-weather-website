const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000 // first one heroku and second one port

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.static(path.join(__dirname, '../public/help.html')))
app.use(express.static(path.join(__dirname, '../public/about.html')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Minchan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Minchan Jun'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Minchan Jun',
        helpText: 'This is helpful text'
    })
})


// app.get('/help', (req, res) => {
//     res.send([
//         {name: 'Minchan'},
//         {name: 'Jee Hyun'}
//     ])
// })

// app.com
// app.com/help
// app.com/about

//Goals: set up two new routes
//Goals: update routes

// app.get('/about', (req, res) =>{
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                latitude,
                longitude

            })
        })
    })
})

app.get('/products', (req, res) =>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }else{

    }

    //console.log(req.query.search) //?search=game in the browser
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Minchan Jun',
        errorMessage: 'Help Article Not Found'
    })
})

// Make sure you define at the end before listen
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Minchan Jun',
        errorMessage: 'Page Not Found'
    })
})



app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})

