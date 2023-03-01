const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    createUser,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser
}           = require("../controllers/User");


router.route("/users").get(getAllUsers).post(createUser);

router.route("/users/:id").get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);



module.exports = router;