const express = require('express')
require('dotenv').config()
var cors = require('cors')

//Route Imports
const homePage = require('./routers/homepage.js')
const users = require('./routers/users.js')
const salons = require('./routers/salons')
const brands = require('./routers/brands')
const categories = require('./routers/categories')
const recommendations = require('./routers/recommendations')
const advertisments = require('./routers/advertisments')
const search = require('./routers/search')
const appointment = require('./routers/appointment')


const app = express()


// Middlewares
app.use(cors())
app.use(express.json())
app.use('/uploads/', express.static('uploads'))

app.get('/', (req, res) => res.send('Welcome to the API for Cara'))
app.use('/api/v1/', homePage)
app.use('/api/v1/users/', users)
app.use('/api/v1/salons/', salons)
app.use('/api/v1/categories/', categories)
app.use('/api/v1/brands/', brands)
app.use('/api/v1/recommendations/', recommendations)
app.use('/api/v1/display/', advertisments)
app.use('/api/v1/search/',search)
app.use('/api/v1/appointments/',appointment)

app.listen(process.env.PORT, console.log(`Server is running on: http://localhost:4000`))