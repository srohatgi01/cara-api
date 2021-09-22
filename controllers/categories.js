const { PrismaClient } = require("@prisma/client");
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
    data: req.body
  });
  res.json(newCategory);
};

//TODO: Update Category

const updateCategory = async (req, res) => res.json("Update Category Details");

const deleteCategory = async (req, res) =>
  res.json("Delete a particular Category");

module.exports = {
  getAllCategories,
  getCategoryById,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
