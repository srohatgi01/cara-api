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
        cara_standards: {
          select: {
            safety_measures: true,
            professionalism: true,
            social_conscience: true,
            miscellaneous: true,
          },
        },
      },
    })
  );


const updateSalon = async (req, res) => {
  let updatedSalon = await prisma.salon.update({
    where: {
      salon_id: parseInt(req.params.id),
    },
    data: {
      salon_name: req.body.salon_name,
      address_line_one: req.body.address_line_one,
      address_line_two: req.body.address_line_two,
      address_line_three: req.body.address_line_three,
      zipcode: `${req.body.zipcode}`,
      email_address: req.body.email_address,
      contact_number: req.body.contact_number,
      website: req.body.website,
      open_time: req.body.open_time,
      close_time: req.body.close_time,
      open_weekdays: req.body.open_weekdays,
      number_of_chairs: req.body.number_of_chairs,
      salon_type: req.body.salon_type,
    },
  });
  res.json(updatedSalon);
};

// Get 6 salons when you give the zipcode
const recommenedSalonsByZipcode = async (req, res) => {
  pool.query(
    `
    SELECT salon.salon_id, salon.salon_name, salon.logo,  ((cara_standards.safety_measures + cara_standards.professionalism + cara_standards.social_conscience + cara_standards.miscellaneous)/4.0)::numeric(3, 2) AS average 
    FROM salon 
    JOIN cara_standards 
    ON salon.salon_id = cara_standards.salon_id 
    WHERE salon.zipcode = \'${req.params.id}\' 
    ORDER BY RANDOM() LIMIT 6;
    `,

    (err, result) => {
      err == null ? null : console.log(err);
      //Error handeling + response
      result.rows.length === 0
        ? res.status(404).json({ msg: "No Salons found" })
        : res.status(200).json(result.rows);
    }
  );
};

const recommenedSalons = async (req, res) => {
  pool.query(
    `
    SELECT salon.salon_id, salon.salon_name, salon.logo,  ((cara_standards.safety_measures + cara_standards.professionalism + cara_standards.social_conscience + cara_standards.miscellaneous)/4.0)::numeric(3, 2) AS average 
    FROM salon 
    JOIN cara_standards 
    ON salon.salon_id = cara_standards.salon_id 
    ORDER BY RANDOM() LIMIT 6;
    `,
    (err, result) => {
      err == null ? null : console.log(err);
      
      result.rows.length > 0 ?
      res.json(result.rows) :
      res.status(404).json({"msg": "No salons found"})
      
    }
  );
};

// this will do authentication process. it will take email and password and will return the salon id associated with the credentials
const getSalonId = async (req, res) => {
  let id = await prisma.salons_cred.findMany({
    select: {
      salon_id: true,
    },
    where: {
      AND: [
        {
          salons_cred_email_id: req.params.email,
        },
        {
          salons_cred_password: req.params.password,
        },
      ],
    },
  });

  id.length < 1
    ? res.status(404).json({ msg: "not found" })
    : res.status(200).json(id[0]);
};

// Exports
module.exports = {
  getAllSalons,
  getSalonById,
  updateSalon,
  recommenedSalonsByZipcode,
  recommenedSalons,
  getSalonId,
};
