const express = require("express");
const connectDB = require("./config/db");
const Note = require("./model/Note");

const app = express();
app.use(express.json());
connectDB();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Notes API is running");
});

app.post("/notes", (req, res, next) => {
  try {
    console.log(req.body);
    const { title, content } = req.body;
    const note = Note.create({ title, content });

    res.status(201).json({ title, content });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to create note" });
  }
});
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});
app.put("/notes/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).send("Note not found");
    }

    res.json(updatedNote);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Failed to update note");
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).send("Note not found");
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Failed to delete note");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
