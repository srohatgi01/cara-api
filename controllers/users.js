const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  res.json(await prisma.users.findMany());
};

const createNewUser = async (req, res) => {
  const newUser = await prisma.users.create({
    data: {
      email_address: req.body.email_address,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      zipcode: req.body.zipcode,
      phone_number: req.body.phone_number,
      photo_url: req.body.photo_url,
      date_of_birth: req.body.date_of_birth,
      coins: req.body.coins,
    },
  });

  res.json(newUser);
};

const getUserById = async (req, res) =>
  res.json(
    await prisma.users.findUnique({
      where: {
        email_address: req.params.id,
      },
    })
  );

//TODO: Create Update User function
const updateUser = (req, res) => {
  res.send(`Update User info for ${req.params.id}`);
};
//TODO: Create Delete User function
const deleteUser = (req, res) => res.send(`User deleted for ${req.params.id}`);

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
};
