import express from "express";
import { deleteNotes, getNotes,  getNotesById,  postNotes, updateNotes } from "../controller/controller.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

export default router;

router.get("/",rateLimiter, getNotes);
router.get("/:id", getNotesById);
router.post("/", postNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes)