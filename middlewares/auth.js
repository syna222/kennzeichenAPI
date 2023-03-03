const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const { authtoken } = req.headers;
    console.log(authtoken);

  //1. Checken ob überhaupt ein Token vorhanden ist:
  if (!authtoken) {
    return res.status(404).send("Access denied");
  }
  //2. Gültigkeit des Tokens prüfen
  try {
    const verified = jwt.verify(authtoken, process.env.JWT_SECRET);
    console.log("verified", verified);
    if (!verified) {
      return res.send("token not valid");
    }
    //wenn verified = true:
    next();
  } catch (err) {
    if (err.message === "jwt malformed") {
      return res.status(404).send("no valid token");
    }
    console.log(err);
    res.status(500).send(err.message);
  }

}


module.exports = auth;


