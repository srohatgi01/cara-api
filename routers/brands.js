const express = require('express')

const router = express.Router()

// Imports  
const { getAllBrands, createNewBrand, getBrandById, updateBrand, deleteBrand } = require('../controllers/brands')

router.route('/').get(getAllBrands).post(createNewBrand)
router.route('/:id').get(getBrandById).patch(updateBrand).delete(deleteBrand)

module.exports = router