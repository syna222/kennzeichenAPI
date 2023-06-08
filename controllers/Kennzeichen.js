const Kennzeichen = require("../models/Kennzeichen");

function compareAlphab(a, b){
    if(a.Kennzeichen < b.Kennzeichen){
      return -1;
    }
    if(a.Kennzeichen > b.Kennzeichen){
      return 1;
    }
    return 0;
}

function compareBL(a, b){
    if(a.Bundesland < b.Bundesland){
      return -1;
    }
    if(a.Bundesland > b.Bundesland){
      return 1;
    }
    return 0;
}

const getAllKennzeichen = async (req, res) => {
    const { sortkfz } = req.query;      // query a la "?sortkfz=true"
    const { sortbu } = req.query;       //query a la "?sortbu=true"
    try{
        const kennzeichen = await Kennzeichen.find();
        //OPT 1: sort alphabetically if sortkfz==="true":
        if(sortkfz==="true"){
            kennzeichen.sort(compareAlphab);
        }
        //OPT 2: sort by bundesland if sortbu==="true":
        if(sortbu==="true"){
            kennzeichen.sort(compareBL);
        }
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