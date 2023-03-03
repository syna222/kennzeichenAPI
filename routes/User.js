const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    createUser,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser, 
    addKennzeichenToUser,
    removeKennzeichenFromUser
}           = require("../controllers/User");

 const auth = require('../middlewares/auth')


router.route("/users").get(auth, getAllUsers).post(createUser);

router.route("/users/:id").get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);

router.route('/users/:id/addkennzeichen').put(addKennzeichenToUser);

router.route('/users/:id/removekennzeichen').put(removeKennzeichenFromUser);

module.exports = router;