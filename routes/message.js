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
  let newMsg = req.body
  const bodyAllowedList = new Set(["msg"]);

  for (const prop in req.body) {
    if (req.body.hasOwnProperty(prop) && !bodyAllowedList.has(prop)) {
      res.status(400).json({ message: 'unexpected parameter in POST body' })
    }
  }
  req.app.locals.db.collection("messages").insertOne(newMsg)
  res.status(200).json({ message: "Ditt meddelande har sparats: ", newMsg })
});

module.exports = router;
