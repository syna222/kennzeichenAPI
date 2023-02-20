const mongoose = require("mongoose");

//Schema-Blueprint aus Library destrukturieren:
const { Schema } = mongoose;

//Neue Schema-Instanz erstellen:
const Kennzeichen = new Schema({
    Kennzeichen: {
        type: String,
        required: true
    },
    Stadt_Ort: {
        type: String,
        required: true
    },
    Landkreis: {
        type: String,
        required: true
    },
    Bundesland: {
        type: String,
        required: true
    },
    auslaufend: {
        type: Boolean,
        required: false
    },
    Nachfolger: {
        type: String,
        required: false
    },
    Längengrad: {
        type: String,
        required: true
    },
    Breitengrad: {
        type: String,
        required: true
    },
    Wikipedia_URL: {
        type: String,
        required: true
    }
});

//export Schema as the model ("CollectionName", Schema, optionales 3. Arg falls Collectionname nicht/anders pluralisiert werden soll):
module.exports = mongoose.model("kennzeichen", Kennzeichen, "kennzeichen");