const express = require("express");

const router = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      file.fieldname === "photos"
        ? "uploads/salons/images"
        : "uploads/salons/logo"
    );
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const salonImagesUpload = multer({ storage: storage });

// Imports
const {
  getAllSalons,
  getSalonById,
  updateSalon,
  getSalonId,
} = require("../controllers/salons");

//Routes
router.route("/").get(getAllSalons);

router.post(
  "/",
  salonImagesUpload.fields([
    { name: "salonLogo", maxCount: 1 },
    { name: "photos", maxCount: 4 },
  ]),
  async (req, res) => {
    let photosList = [];
    req.files["photos"].map((file) => photosList.push(file.path));

    let newSalon = await prisma.salon.create({
      data: {
        brand_id: parseInt(req.body.brand_id),
        salon_name: req.body.salon_name,
        address_line_one: req.body.address_line_one,
        address_line_two: req.body.address_line_two,
        address_line_three: req.body.address_line_three,
        zipcode: req.body.zipcode,
        email_address: req.body.email_address,
        contact_number: req.body.contact_number,
        logo: req.files["salonLogo"][0].path,
        photos: photosList,
        website: req.body.website,
        open_year: req.body.open_year,
        open_time: req.body.open_time,
        close_time: req.body.close_time,
        open_weekdays: req.body.open_weekdays,
        number_of_chairs: parseInt(req.body.number_of_chairs),
        salon_type: req.body.salon_type,
      },
    });
    res.status(201).json(newSalon);
  }
);
router.route("/:id").get(getSalonById).patch(updateSalon);
router.route("/auth/:email/:password").get(getSalonId);
module.exports = router;
