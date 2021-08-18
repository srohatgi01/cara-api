const express = require('express')

// Controller Imports
const { recommenedSalonsByZipcode, recommenedSalons } = require('../controllers/salons')

const router  = express.Router ()

router.route('/salons/:id').get(recommenedSalonsByZipcode)
router.route('/salons').get(recommenedSalons)

module.exports = router