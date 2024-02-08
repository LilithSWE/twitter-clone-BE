var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  //Kopplar till databasen i MongoDB   
  req.app.locals.db.collection("messages").find().toArray()
    .then((results) => {

      const allMsgs = results.map(u => {
        return { message: u.msg }
      });
      res.json(allMsgs);
    });
});

// POST en ny user. Skickas via Postman för tillfället -> skall sedan skötas via inputs från frontend. 
router.post("/add", function (req, res) {
  // Ta emot post anropet för EN användare i objekt format från Postman och lägg till i databasen
  let newMsg = req.body;


  // Lägg till i databasen (alternativt skapa db och sen lägg till om den inte finns).
  req.app.locals.db.collection("messages").insertOne(newMsg)
  res.status(200).json({ message: "Ditt meddelande har sparats: ", newMsg })
});

module.exports = router;
