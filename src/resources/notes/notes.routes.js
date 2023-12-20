import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "./notes.controllers.js";
import {
  Login,
  SingUp
} from "./user.controllers.js";
import {
  createVehicle,
  deleteVehicle,
  getAllVehicle,
  getSingleVehicle,
  updateVehicle
} from "./vehicle.controllers.js";

const router = express.Router();
router.route("/login").post(Login);
router.route("/singup").post(SingUp);
router.route("/vehicle").get(getAllVehicle).post(createVehicle);
router.route("/vehicle/:id").get(getSingleVehicle).patch(updateVehicle).delete(deleteVehicle);
router.route("/api").get(getAllNotes).post(createNote);
router.route("/api/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);

export default router;
