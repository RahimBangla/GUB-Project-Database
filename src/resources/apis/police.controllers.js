import { pool } from "../../db/connect.js";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";

/**
 * @returns note object
 */
async function getTrafficpolice(id) {
  let sql = "SELECT * FROM Trafficpolices WHERE police_id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

/**
 * @description Get All note
 * @route GET /notes
 */
export const getAllTrafficpolice = tryCatchWrapper(async function (req, res, next) {
  let sql = "SELECT * from Trafficpolices";
  const [rows] = await pool.query(sql);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ data: rows });
});

/**
 * @description Get Single note
 * @route GET /notes/:id
 */
export const getSingleTrafficpolice = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  const note = await getTrafficpolice(id);
  if (!note) return next(createCustomError("note not found", 404));

  return res.status(200).json(note);
});

/**
 * @description Create note
 * @route POST /notes
 */
export const createTrafficpolice = tryCatchWrapper(async function (req, res, next) {
  const { police_id, name, badge_number, contact_number } = req.body;
  if (!police_id || !name || !badge_number || !contact_number)
  return next(createCustomError("All fields are required", 400));
const [rows] = await pool.query("SELECT MAX(police_id) AS id FROM Trafficpolice");
console.log( rows[0].id);
  let sql = "INSERT INTO Trafficpolice (police_id , name, badge_number, contact_number) VALUES (?, ?, ?, ?)";
  await pool.query(sql, [rows[0].id+1, name, badge_number, contact_number]);

  return res.status(201).json({ message: "Traffic Plice has been created" });
});

/**
 * @description Update note
 * @route PATCH /notes/:id
 */
export const updateTrafficpolice = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;
  const { police_id, name, badge_number, contact_number } = req.body;

  if (!id || !police_id || !name || !badge_number || !contact_number)
    return next(createCustomError("All fields are required", 400));

  const note = await getTrafficpolice(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "UPDATE Trafficpolice SET name = ?, badge_number = ?, contact_number = ? WHERE police_id = ?";
  await pool.query(sql, [name, badge_number, contact_number, id]);

  return res.status(201).json({ message: "Traffic Plice has been updated" });
});

/**
 * @description Delete note
 * @route DELETE /notes/:id
 */
export const deleteTrafficpolice = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  if (!id) return next(createCustomError("Id is required", 400));

  const note = await getTrafficpolice(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "DELETE FROM Trafficpolice WHERE police_id = ?";
  await pool.query(sql, [id]);

  return res.status(200).json({ message: "note has been deleted" });
});

