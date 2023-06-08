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
    const { Username, Email, Passwort } = req.body;
    //if required fields are empty:
    if(!Username || !Email || !Passwort){
        return res.status(400).send("All fields are required");
    }
    //if user w/ email already exist:
    const [existingUser] = await User.find({Email: Email});
    if(existingUser){
       return res.status(400).send("There already is a user with this email.");
    }
    try{
        const newUser = await User.create({Username, Email, Passwort});
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
    const { id } = req.params;
    const { kennzeichenId } = req.body;   //destrukt. Schreibweise für x = req.body.kennzeichenId (deshalb muss feld so heißen in put request)
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {$addToSet: {Gesehene_Kennzeichen: kennzeichenId}}, {new: true}).exec(); //$addToSet instead of $push prevents duplicates!
        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}

const removeKennzeichenFromUser = async (req, res) => {
    const { id } = req.params;
    const { kennzeichenId } = req.body;  //destrukt. Schreibweise für x = req.body.kennzeichenId (deshalb muss feld so heißen in put request)
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {$pull: {Gesehene_Kennzeichen: kennzeichenId}}, {new: true}).exec();
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
    deleteSingleUser, 
    addKennzeichenToUser,
    removeKennzeichenFromUser
}