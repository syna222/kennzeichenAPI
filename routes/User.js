const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    createUser,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser, addKennzeichenToUser
}           = require("../controllers/User");


router.route("/users").get(getAllUsers).post(createUser);

router.route("/users/:id").get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);

router.route('/users/:id/addkennzeichen').put(addKennzeichenToUser)

module.exports = router;