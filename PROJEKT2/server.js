const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const Task = require("./Task");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/todo", {
    useNewUrlParser: true, // Nowoczesne parsowanie URL
    useUnifiedTopology: true, // Nowoczesny mechanizm zarządzania połączeniami
  })
  .then(() => {
    console.log("Połączono z MongoDB");
  })
  .catch((err) => {
    console.error("Błąd połączenia z MongoDB:", err);
  });


// Endpoint obsługujący żądanie POST
// Endpoint POST
app.post("/tasks", async (req, res) => {
  try {
    const receivedData = req.body.data;
    console.log("Received data:", receivedData);

    const newTask = new Task({ data: receivedData });
    await newTask.save();

    res.status(201).json({ message: `${receivedData}` });
  } catch (err) {
    console.error("Error saving task:", err);
    res.status(500).json({ error: "Błąd podczas zapisu do bazy danych" });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (err) {
    console.error("Error reading tasks:", err);
    res.status(500).json({ error: "Błąd podczas odczytu z bazy danych" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});