const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const searchSalons = async (req, res) => {
  res.status(200).json(
    await prisma.salon.findMany({
      take: 10,
      select: {
        salon_id: true,
        salon_name: true,
        address_line_one: true,
        address_line_two: true,
        // address_line_three: true,
        logo: true,
        salon_type: true,
      },
      where: {
        OR: [
          {
            salon_name: {
              startsWith: req.params.keyword,
              mode: "insensitive",
            },
          },

          {
            address_line_two: {
              startsWith: req.params.keyword,
              mode: "insensitive",
            },
          },
          {
            address_line_three: {
              contains: req.params.keyword,
              mode: "insensitive",
            },
          },
          {
            zipcode: {
              startsWith: req.params.keyword,
            },
          },
        ],
      },
    })
  );
};

module.exports = { searchSalons };
