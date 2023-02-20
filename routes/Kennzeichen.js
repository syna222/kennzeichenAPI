const express = require("express");
const router = express.Router();
const {
    getAllKennzeichen,
    getSingleKennzeichen,
    getBundesland
}            = require("../controllers/Kennzeichen");


router.route("/").get(getAllKennzeichen);

router.route("/:kz").get(getSingleKennzeichen);

router.route("/bundesland/:bl").get(getBundesland);


module.exports = router;