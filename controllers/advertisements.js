
const pool = require("../config");

const getAdvertisementsByZipcode = async (req, res) => {
    // pool.query('SET TIMEZONE =\'Asia/Calcutta\', SELECT NOW()', (err, res) => console.log(res.rows));
    pool.query(
      `SELECT salon_id, banner_position_number, banner_url FROM upper_banner WHERE zipcode = '${req.params.zipcode}' AND NOW() at TIME ZONE 'Asia/Calcutta' BETWEEN start_date AND end_date;`,
  
      (err, result) => {
        console.log(err);
        //Error handeling + response 
        result.rows.length === 0
          ? res.status(200).json({ msg: "No Banners Found for this particular ZipCode" })
          : res.status(200).json(result.rows);

        // res.json(result.rows)
      }
    );
  };

module.exports = {
    getAdvertisementsByZipcode
}