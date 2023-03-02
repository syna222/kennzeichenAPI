const mongoose = require("mongoose");

//Schema-Blueprint aus Library destrukturieren:
const { Schema } = mongoose;

//Neue Schema-Instanz erstellen:
const User = new Schema({
    Vorname:{
        type: String,
        required: true
    },
    Nachname:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Passwort:{
        type: String,
        required: true
    },
    Gesehene_Kennzeichen: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "kennzeichen", //references collectionName
            default: []
        }
    ],
    Highscore:{
        type: Number
    }
});

//export Schema as the model ("CollectionName", Schema, optionales 3. Arg falls Collectionname nicht/anders pluralisiert werden soll):
module.exports = mongoose.model("user", User);