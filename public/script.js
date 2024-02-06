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
  "CREATE TABLE IF NOT EXISTS stemmer (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT)"
);

// virker med html javascript og css
app.use(express.static("public"));

add.post("/vote/:question", (req, res) => {
  const question = req.params.question;

  // legger til stemmer i databasen
  db.run("INSERT INTO stemmer (question) VALUES (?)", [question], (err) => {
    if (err) {
      return res.status(500).send("Error med stemmen");
    }
    res.status(200).send("Stemme vellykket");
  });
});

// Får stemmene
app.get("/votes", (req, res) => {
  // henter stemme data fra datbasen
  db.all(
    "SELECT question, COUNT(*) as count FROM votes GROUP BY question",
    (err, rows) => {
      if (err) {
        return res.status(500).send("Error for å få tak i stemmer");
      }
      res.json(rows);
    }
  );
});

// Starter localhost
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
