const pool = require("../config");
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const getAdvertisementsByZipcode = async (req, res) => {
  // pool.query('SET TIMEZONE =\'Asia/Calcutta\', SELECT NOW()', (err, res) => console.log(res.rows));
  pool.query(
    `SELECT salon_id, banner_position_number, banner_url FROM upper_banner WHERE zipcode = '${req.params.zipcode}' AND NOW() at TIME ZONE 'Asia/Calcutta' BETWEEN start_date AND end_date;`,

    (err, result) => {
     if(err) console.log(err);
      //Error handeling + response
      if(result.rows.length === 0) {
        res
        .status(404)
        .json({ msg: "No Banners Found for this particular ZipCode" })
      } else {
        bannerList = [1, 2, 3, 4, 5, 6];
        for (let i = 0; i < 6; i++) {
          switch (result.rows[i].banner_position_number) {
            case "ONE":
              bannerList[0] = result.rows[i];
              break;
            case "TWO":
              bannerList[1] = result.rows[i];
              break;
            case "THREE":
              bannerList[2] = result.rows[i];
              break;
            case "FOUR":
              bannerList[3] = result.rows[i];
              break;
            case "FIVE":
              bannerList[4] = result.rows[i];
              break;
            case "SIX":
              bannerList[5] = result.rows[i];
              break;
          }
        }
        res.status(200).json(bannerList);
      }
    
    }
  );
};

const createAdvertisment = async (req, res) => {
  let newAdvertisement = await prisma.upper_banner.create({
    data: {
      salon_id: req.body.salon_id,
      banner_url: req.body.banner_url,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      zipcode: req.body.zipcode,
      price: req.body.price,
      banner_position_number: req.body.banner_position_number,
    }
  })

  res.status(200).json(newAdvertisement)

  
}

module.exports = {
  getAdvertisementsByZipcode,
  createAdvertisment,
};
