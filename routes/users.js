var express = require('express');
var router = express.Router();
let { randomUUID } = require("crypto");


/* GET users listing.  */
router.get('/', function (req, res) {
  //Kopplar till databasen i MongoDB som vi kopplat till i app.js. + vilken collection + hittar alla + gör till array.  
  req.app.locals.db.collection("users").find().toArray()
    .then((results) => {

      const allUsers = results.map(u => {
        return { id: u.id, name: u.name, email: u.email }
      });
      res.json(allUsers);
    });
});

// POST en ny user. Skickas via Postman för tillfället -> skall sedan skötas via inputs från frontend. 
router.post("/add", function (req, res) {
  // Ta emot post anropet för EN användare i objekt format från Postman och lägg till i databasen
  let newUser = req.body;
  // Ge ett random id nummer
  newUser.id = randomUUID();
  // Lägg till i databasen (alternativt skapa db och sen lägg till om den inte finns).
  req.app.locals.db.collection("users").insertOne(newUser)
  res.status(200).json({ message: "Din användare har skapats och givits ett id nummer", newUser })
});

// POST user ID search med json
router.post('/', function (req, res) {
  // Tar emot ett json object som skickats in med 1 parameter. 
  let userId = req.body.id;
  console.log(userId)
  // Hämta db och sök efter ID för 1 användare.
  req.app.locals.db.collection("users").findOne({ "id": userId })
    .then((user) => {
      if (user) {
        res.status(200).json({ message: "Din användare kunde hittas", user })
      }
      else {
        res.status(401).json({ message: "Användaren finns inte" })
      }
    });
});

// POST log in -> svar med användare id. 
router.post("/login", (req, res) => {
  // Tar emot ett json object som skickats in med 2 parametrar. 
  let checkEmail = req.body.email;
  let checkPassword = req.body.password;

  req.app.locals.db.collection("users").findOne({ "email": checkEmail })
    .then((foundUser) => {
      if (foundUser) {
        if (foundUser.password === checkPassword) {
          res.status(200).json({ message: "Kunde logga in", id: foundUser.id })

        }
        else {
          res.status(401).json({ message: "Fel lösenord" })
        }
      }
      else {
        res.status(401).json({ message: "Användaren finns inte" })
      }
    })
});





module.exports = router;
