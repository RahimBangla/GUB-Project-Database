import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "./notes.controllers.js";

const router = express.Router();

router.route("/api").get(getAllNotes).post(createNote);
router.route("/api/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);

export default router;
