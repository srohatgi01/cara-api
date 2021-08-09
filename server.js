const express = require('express')
const { PrismaClient } = require('@prisma/client')
require('dotenv').config()

//Route Imports
const homePage = require('./routers/homepage.js')
const users = require('./routers/users.js')

const app = express()


// Middlewares
app.use(express.json())

app.get('/', (req, res) => res.send('Welcome to the API for Cara'))
app.use('/api/v1/', homePage)
app.use('/api/v1/users/', users)

app.listen(process.env.PORT, console.log(`Server is running on: http://localhost:4000`))