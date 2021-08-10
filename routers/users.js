const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.js");

router.route("/").get(getAllUsers).post(createNewUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
