// Imports
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// functions
const getAllSalons = async (req, res) =>
  res.json(await prisma.salon.findMany());

const getSalonById = async (req, res) =>
  res.json(
    await prisma.salon.findUnique({
      where: { salon_id: parseInt(req.params.id) },
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
  res.json("Create Salon");
};

//TODO: Create Update Salon Function
const updateSalon = async (req, res) => {
  res.json("Update Salon");
};

//TODO: Create Delete Salon Function
const deleteSalon = async (req, res) => res.json("Delete salon");

// Exports
module.exports = {
  getAllSalons,
  getSalonById,
  createNewSalon,
  updateSalon,
  deleteSalon,
};
