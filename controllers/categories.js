const { PrismaClient } = require("@prisma/client");
var JSONbig = require('json-bigint')
const prisma = new PrismaClient();

const getAllCategories = async (req, res) =>
  res.json(await prisma.categories.findMany({include: {services: true}}))

const getCategoryById = async (req, res) =>
  res.json(
    await prisma.categories.findUnique({
      where: { category_id: parseInt(req.params.id) },
    })
  );

const createNewCategory = async (req, res) => {
  const newCategory = await prisma.categories.create({
    data: {
      category_name: req.body.category_name,
      salon_id: req.body.salon_id,
    },
  });
  res.json(newCategory);
};

//TODO: Update Category

const updateCategory = async (req, res) => res.json("Update Category Details");

//TODO: Delete category
const deleteCategory = async (req, res) =>
  res.json("Delete a particular Category");

module.exports = {
  getAllCategories,
  getCategoryById,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
