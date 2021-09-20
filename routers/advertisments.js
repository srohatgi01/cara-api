const express = require("express");

const pool = require("../config");

const {
  getAdvertisementsByZipcode,
  createAdvertisment,
} = require("../controllers/advertisements");

const multer = require("multer");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/upperbanner/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_'+ file.originalname)
    }
})

const upload = multer({ storage: storage});

const router = express.Router();

router.route("/upperbanner/:zipcode").get(getAdvertisementsByZipcode);

router.post("/upperbanner", upload.single("bannerImage"), async (req, res) => {
    pool.query(
        `INSERT INTO upper_banner(salon_id, banner_url, start_date, end_date, zipcode, price, banner_position_number) VALUES(${req.body.salon_id}, '${req.file.path}', '${req.body.start_date}', '${req.body.end_date}', '${req.body.zipcode}', '${req.body.price}', '${req.body.banner_position_number}');`,
    
        (err, result) => {
          console.log(err);
        
            if(err === undefined) {
                res.status(201).json({"msg": "Post Request Successfully Done", "success": true})
            } else {
                res.status(400).json({"err": "Post Request Not Successful", "success": false})
            }
        }
      );
});

module.exports = router;
