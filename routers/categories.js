const express = require('express');

const router = express.Router()

//Imports
 const{ getAllCategories, getCategoryById, createNewCategory, updateCategory, deleteCategory} = require('../controllers/categories')

 router.route('/').get(getAllCategories).post(createNewCategory)
 router.route('/:id').get(getCategoryById).patch(updateCategory).delete(deleteCategory)

 module.exports = router