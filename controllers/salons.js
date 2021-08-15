// Imports
const { PrismaClient } = require("@prisma/client");
const pool = require("../config");

const prisma = new PrismaClient();

// functions
const getAllSalons = async (req, res) =>
  res.json(await prisma.salon.findMany());

const getSalonById = async (req, res) =>
  res.json(
    await prisma.salon.findUnique({
      where: { salon_id: parseInt(req.params.id) },
      include: {
        categories: {
          include: {
            services: true,
          },
        },
      },
    })
  );

const createNewSalon = async (req, res) => {
  let newSalon = await prisma.salon.create({
    data: {
      brand_id: req.body.brand_id,
      salon_name: req.body.salon_name,
      address_line_one: req.body.address_line_one,
      address_line_two: req.body.address_line_two,
      address_line_three: req.body.address_line_three,
      zipcode: req.body.zipcode,
      email_address: req.body.email_address,
      contact_number: req.body.contact_number,
      logo: req.body.logo,
      photos: req.body.photos,
      website: req.body.website,
      open_year: req.body.open_year,
      open_time: req.body.open_time,
      close_time: req.body.close_time,
      open_weekdays: req.body.open_weekdays,
      number_of_chairs: req.body.number_of_chairs,
      salon_type: req.body.salon_type,
    },
  });
  res.status(201).json(newSalon);
};

//TODO: Update Salon Function
const updateSalon = async (req, res) => {
  res.json("Update Salon");
};

//TODO: Delete Salon Function
const deleteSalon = async (req, res) => res.json("Delete salon");

// Get 6 salons when you give the zipcode
const recommenedSalonsByZipcode = async (req, res) => {
  pool.query(
    `SELECT salon_id, salon_name, logo FROM salon WHERE zipcode = \'${req.params.id}\'  ORDER BY RANDOM() LIMIT 6 `,

    (err, result) => {
      console.log(err);
      //Error handeling + response 
      result.rows.length === 0
        ? res.status(200).json({ msg: "No Salons found" })
        : res.status(200).json(result.rows);
    }
  );
};

const recommenedSalons = async (req, res) => {
  pool.query(
    `SELECT salon_id, salon_name, logo FROM salon ORDER BY RANDOM() LIMIT 6 `,
    (err, result) => {
      console.log(err);
      res.json(result.rows);
    }
  );
};

// Exports
module.exports = {
  getAllSalons,
  getSalonById,
  createNewSalon,
  updateSalon,
  deleteSalon,
  recommenedSalonsByZipcode,
  recommenedSalons,
};
