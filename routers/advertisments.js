const express = require('express')
const { getAdvertisementsByZipcode } = require('../controllers/advertisements')

const router = express.Router()

router.route('/upperbanner/:zipcode').get(getAdvertisementsByZipcode)

module.exports = router