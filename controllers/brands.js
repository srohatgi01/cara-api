const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllBrands = async (req, res) =>
  res.json(await prisma.brand.findMany());

const getBrandById = async (req, res) =>
  res.json(
    await prisma.brand.findUnique({
      where: { brand_id: parseInt(req.params.id) },
    })
  );

const createNewBrand = async (req, res) => {
  const newBrand = await prisma.brand.create({
    data: {
      name: req.body.name,
      representative_first_name: req.body.representative_first_name,
      representative_last_name: req.body.representative_last_name,
      contact_number: req.body.contact_number,
      website_url: req.body.website_url,
    },
  });

  res.json(newBrand);
};

//TODO: Update Brand
const updateBrand = async (req, res) => res.json("Update Brand Details");

//TODO: Delete brand
const deleteBrand = async (req, res) => res.json("Delete a particular Brand");

module.exports = {
  getAllBrands,
  getBrandById,
  createNewBrand,
  updateBrand,
  deleteBrand,
};
