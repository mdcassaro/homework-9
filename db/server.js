var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes = [
    {
    routeName: "notes",
    name: ""
    },

]

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/note.html"));
  });
  
  // Displays all notes
  app.get("/api/notes", function(req, res) {
    return db.json(notes);
  });

  //Display single note or return false
  app.get("/api/notes/:id", function(req, res) {
    var chosen = req.params.notes;
  
    console.log(chosen);
  
    for (var i = 0; i < notes.length; i++) {
      if (chosen === notes[i].routeName) {
        return res.json(notes[i]);
      }
    }
  
    return res.json(false);
  });
 
  

  app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
  
    notes.push(newNote);
  
    res.json(newNote);
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  