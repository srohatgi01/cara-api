const express = require("express");

// Controller Import
const {
  getAllSlots,
  getAllSlotsByChairNo,
  getAllAppointments,
  getAllAppointmentDetails,
  createNewAppointment,
  getAppointmentsForSalon,
  getAppointmentsForUser,
} = require("../controllers/appointment");


const router = express.Router();

router.route("/").get(getAllAppointments).post(createNewAppointment);
router.route("/details").get(getAllAppointmentDetails);
router.route("/slots/:id/:date").get(getAllSlots);
router.route("/slots/:id/:date/:chair").get(getAllSlotsByChairNo);
router.route("/salons/:id/:date").get(getAppointmentsForSalon);
router.route("/users/:id").get(getAppointmentsForUser);

module.exports = router;
