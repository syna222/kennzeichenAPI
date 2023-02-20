const Kennzeichen = require("../models/Kennzeichen");


const getAllKennzeichen = async (req, res) => {
    try{
        const kennzeichen = await Kennzeichen.find();
        res.status(200).json(kennzeichen);
    }
    catch(err){
        console.log(err.message);
    }
}

const getSingleKennzeichen = async (req, res) => {
    const { kz } = req.params;
    try{
        const kennzeichen = await Kennzeichen.find({Kennzeichen: kz});
        res.status(200).json(kennzeichen);
    }
    catch(err){
        console.log(err.message);
    }
}

const getBundesland = async (req, res) => {
    const { bl } = req.params;
    try{
        const kzsBundesland = await Kennzeichen.find({Bundesland: bl});
        res.status(200).json(kzsBundesland);
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = {
    getAllKennzeichen,
    getSingleKennzeichen,
    getBundesland
}