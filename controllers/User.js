const User = require("../models/User");

const getAllUsers = async (req, res) => {
    try{
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } 
    catch(err){
        res.status(404).send(err.message);
    }
}

const createUser = async (req, res) => {
    const { Vorname, Nachname, Email, Passwort } = req.body;
    try{
        const newUser = await User.create({Vorname, Nachname, Email, Passwort});
        res.status(201).json(newUser);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const getSingleUser = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findById(id).populate('Gesehene_Kennzeichen');
        res.status(200).json(user);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const updateSingleUser = async (req, res) => {
    const { id } = req.params;
    const { Vorname, Nachname, Email, Passwort, Gesehene_Kennzeichen, Highscore } = req.body;       //what about optional ones?
    try{
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {Vorname, Nachname, Email, Passwort, Gesehene_Kennzeichen, Highscore},
            {new: true}     //returns updated User, otherwise outdated one
            );
        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const deleteSingleUser = async (req, res) => {
    const { id } = req.params;
    try{
        const deletedUser = await User.findByIdAndDelete(id);
        res.send(200).send(`The user with the id ${id} has successfully been deleted.`);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const addKennzeichenToUser = async (req, res) => {
    //userid:
    const {id} = req.params;
    //KennzeichenId:
    const {kennzeichenId} = req.body;

    console.log(req.body)
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {$push: {Gesehene_Kennzeichen: kennzeichenId}}, {new: true}).exec();
        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}


module.exports = {
    getAllUsers,
    createUser,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser, addKennzeichenToUser
}