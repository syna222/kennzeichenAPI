const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {

    const { Email, Passwort } = req.body;
    try{
        const [user] = await User.find({ Email: Email, Passwort: Passwort}).populate('Gesehene_Kennzeichen');
        //res.status(200).json(user);
        if(user){
            console.log("user found");
            const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
            console.log("token", token);
            return res.status(200).send(token);
        } else{
            return res.status(404).send("User nicht gefunden.");
        }

    }catch(err){
        res.status(404).send(err.message);
    }


}

module.exports =  {login};