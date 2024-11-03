const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
const filePath = path.join(__dirname, "notes.json");

// Endpoint obsługujący żądanie POST
app.post("/notes", (req, res) => {
  const receivedData = req.body.data; // Odczyt danych przesłanych z frontendu
  console.log("Received data:", receivedData); // Logowanie danych na serwerze

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Błąd podczas odczytu pliku" });
    }

    let notes = data ? JSON.parse(data) : [];

    // Dodanie nowej notatki do tablicy
    notes.push({ data: receivedData });

    // Zapis zaktualizowanej tablicy do pliku
    fs.writeFile(filePath, JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).json({ error: "Błąd podczas zapisu do pliku" });
      }

      console.log("Note saved:", receivedData);
      res.status(201).json({ message: `Notatka zapisana: ${receivedData}` });
    });
  });
});


app.get("/notes", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Błąd podczas odczytu pliku" });
    }

    const notes = data ? JSON.parse(data) : [];
    res.json({ notes }); // Zwracanie notatek w odpowiedzi
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
