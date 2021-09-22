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
  {
    let userById = await prisma.users.findUnique({
      where: {
        email_address: req.params.id,
      },
    })
    userById != null ? res.status(200).json(userById) : res.status(404).json({'err': 'User Not Found'})
  }

const updateUser = async (req, res) => {
 let updatedUser = await prisma.users.update({
    where: {
      email_address: req.params.id
    },
    data: {
      zipcode: `${req.body.zipcode}`,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      gender: req.body.gender,
      coins: req.body.coins,
    }
  })

  res.json(updatedUser)
};

const deleteUser = (req, res) => res.send("delete user");

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
};
