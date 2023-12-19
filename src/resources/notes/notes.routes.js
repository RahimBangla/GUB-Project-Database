import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "./notes.controllers.js";
import {
  createVehicle,
} from "./vehicle.controllers.js";

const router = express.Router();

router.route("/vehicle").get(getAllNotes).post(createVehicle);
router.route("/api").get(getAllNotes).post(createNote);
router.route("/api/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);

export default router;
