const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Obsługa plików statycznych z bieżącego katalogu
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/submit-form", (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const message = req.body.message;

  console.log(`Imię: ${userName}, Email: ${email}, Wiadomość: ${message}`);
  res.send("Formularz został wysłany pomyślnie!");
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
