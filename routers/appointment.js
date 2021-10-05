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
  createEmptyAppointment,
  updateAppointmentStatus,
  createUserRating,
} = require("../controllers/appointment");


const router = express.Router();
//To get all appointments and to create a new appointment with appointment deatils
router.route("/").get(getAllAppointments).post(createNewAppointment);

//To update the appointment status of appointment
router.route("/update/:id").patch(updateAppointmentStatus);

// To get all the data from apppointment details table
router.route("/details").get(getAllAppointmentDetails);

//Get all the slots from salon id as well as date
router.route("/slots/:id/:date").get(getAllSlots);

//Get all slots from salon id, date and chair number
router.route("/slots/:id/:date/:chair").get(getAllSlotsByChairNo);

//Get all the appointments for the salons from salon id and date
router.route("/salons/:id/:date").get(getAppointmentsForSalon);

//Create new "BUSY" appointment for salon owners
router.route("/salons").post(createEmptyAppointment)

//Get all the appointments for the users exculding the ones with "BUSY" status
router.route("/users/:id").get(getAppointmentsForUser);

//Get user rating + review
router.route("/userrating").post(createUserRating)

module.exports = router;
