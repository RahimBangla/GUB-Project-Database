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

import {
  createAccident,
  deleteAccident,
  getAllAccident,
  getSingleAccident,
  updateAccident
} from "./accident.controllers.js";
import {
  createDrivers,
  deleteDrivers,
  getAllDrivers,
  getSingleDrivers,
  updateDrivers
} from "./driver.controllers.js";
import {
  createLog,
  deleteLog,
  getAllLog,
  getSingleLog,
  updateLog
} from "./log.controllers.js";
import {
  createTrafficpolice,
  deleteTrafficpolice,
  getAllTrafficpolice,
  getSingleTrafficpolice,
  updateTrafficpolice
} from "./police.controllers.js";
import {
  createVictim,
  deleteVictim,
  getAllVictim,
  getSingleVictim,
  updateVictim
} from "./victims.controllers.js";
import {
  createWitnesse,
  deleteWitnesse,
  getAllWitnesse,
  getSingleWitnesse,
  updateWitnesse
} from "./witnesses.controllers.js";

const router = express.Router();
router.route("/login").post(Login);
router.route("/singup").post(SingUp);
router.route("/vehicle").get(getAllVehicle).post(createVehicle);
router.route("/vehicle/:id").get(getSingleVehicle).patch(updateVehicle).delete(deleteVehicle);


router.route("/accident").get(getAllAccident).post(createAccident);
router.route("/accident/:id").get(getSingleAccident).patch(updateAccident).delete(deleteAccident);

router.route("/drivers").get(getAllDrivers).post(createDrivers);
router.route("/drivers/:id").get(getSingleDrivers).patch(updateDrivers).delete(deleteDrivers);

router.route("/log").get(getAllLog).post(createLog);
router.route("/log/:id").get(getSingleLog).patch(updateLog).delete(deleteLog);

router.route("/police").get(getAllTrafficpolice).post(createTrafficpolice);
router.route("/police/:id").get(getSingleTrafficpolice).patch(updateTrafficpolice).delete(deleteTrafficpolice);

router.route("/victims").get(getAllVictim).post(createVictim);
router.route("/victims/:id").get(getSingleVictim).patch(updateVictim).delete(deleteVictim);

router.route("/witnesses").get(getAllWitnesse).post(createWitnesse);
router.route("/witnesses/:id").get(getSingleWitnesse).patch(updateWitnesse).delete(deleteWitnesse);


router.route("/api").get(getAllNotes).post(createNote);
router.route("/api/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);

export default router;
