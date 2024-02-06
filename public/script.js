// legger til express og sqlite3

const express = require("express");
const sqlite3 = require("sqlite3").verbose();

// legger til port
const app = express();
const port = 3000;

// legger til databasen
const db = new sqlite3.Database("ValgDatabase.db");

// Oppretter tabell for stemmer hvis tabellen ikke allerede eksisterer
db.run(
  "CREATE TABLE IF NOT EXISTS stemmer (id INTEGER PRIMARY KEY AUTOINCREMENT, kandidat TEXT)"
);

// virker med html javascript og css
app.use(express.static("public"));

add.post("/vote/:candidate", (req, res) => {
  const candidate = req.params.candidate;

  // legger til stemmer i databasen
  db.run("INSERT INTO stemmer (kandidat) VALUES (?)", [kandidat], (err) => {
    if (err) {
      return res.status(500).send("Feil skjedde med stemmen");
    }
    res.status(200).send("Stemme vellykket");
  });
});
