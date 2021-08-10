const express = require("express");

const router = express.Router();

// Imports
const {
  getAllSalons,
  getSalonById,
  createNewSalon,
  updateSalon,
  deleteSalon,
} = require("../controllers/salons");


//Routes
router.route("/").get(getAllSalons).post(createNewSalon);
router.route("/:id").get(getSalonById).patch(updateSalon).delete(deleteSalon);

module.exports = router;
