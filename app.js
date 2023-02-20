require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");

//routes anfordern:
const kzRouter = require("./routes/Kennzeichen");

//database:
const db = require("./db/db");
db();

//parst Daten aus req.body (kommend aus HTML Formularen)
app.use(express.urlencoded({ extended: true }));

//parst JSON Daten aus req.body (kommend aus NICHT-HTML Formularen)
app.use(express.json());

//erlaubt Zugriff unabhängig vom Client
app.use(cors());

//routes anwenden:
app.use("/", kzRouter);


app.listen(port);