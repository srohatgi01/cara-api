const express = require('express')
const { PrismaClient } = require('@prisma/client')
require('dotenv').config()
var cors = require('cors')

//Route Imports
const homePage = require('./routers/homepage.js')
const users = require('./routers/users.js')
const salons = require('./routers/salons')
const brands = require('./routers/brands')
const recommendations = require('./routers/recommendations')
const advertisments = require('./routers/advertisments')

const app = express()


// Middlewares
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('Welcome to the API for Cara'))
app.use('/api/v1/', homePage)
app.use('/api/v1/users/', users)
app.use('/api/v1/salons/', salons)
app.use('/api/v1/brands/', brands)
app.use('/api/v1/recommendations/', recommendations)
app.use('/api/v1/advertisments/', advertisments)


app.listen(process.env.PORT, console.log(`Server is running on: http://localhost:4000`))