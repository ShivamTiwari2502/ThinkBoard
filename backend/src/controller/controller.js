import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // newest one
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getNotesById = async (req, res) => {
  try {
    const notes = await Note.findById(req.params.id);
    res.status(201).json(notes);
  } catch (error) {
    res.status(501).json({ message: "note was not present with this Id" });
  }
};

export const postNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
    });
    await note.save();
    res.status(201).json({ message: "second note created succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, content });
    res.status(200).json({message : "note updated successfully"})
  } catch (error) {
    console.log(error);
    res.status(429).json({ message: "internal server error" });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "note deleted successfully" });
  } catch (error) {
    res.send("note was not deleted", req.params.id);
    console.log("error in delete note controller");
  }
};
