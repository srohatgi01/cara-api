const express = require('express')
const { searchSalons } = require('../controllers/search')

const router = express.Router()

router.route('/salons/:keyword').get(searchSalons)

module.exports = router
