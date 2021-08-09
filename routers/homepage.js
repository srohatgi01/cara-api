const express = require('express')

const router = express.Router()

router.get('/', (req, res)=> res.send('Welcome to the REST API'))

module.exports = router