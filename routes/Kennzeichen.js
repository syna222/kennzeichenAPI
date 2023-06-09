const express = require("express");
const router = express.Router();
const {
    getAllKennzeichen,
    getSingleKennzeichen,
    getBundesland
}            = require("../controllers/Kennzeichen");

router.route("/kennzeichen").get(getAllKennzeichen);
router.route("/kennzeichen/:kz").get(getSingleKennzeichen);
router.route("/kennzeichen/bundesland/:bl").get(getBundesland);

module.exports = router;