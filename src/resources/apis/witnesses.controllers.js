import { pool } from "../../db/connect.js";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";

/**
 * @returns note object
 */
async function getWitnesse(id) {
  let sql = "SELECT * FROM witnesses WHERE witness_id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

/**
 * @description Get All note
 * @route GET /notes
 */
export const getAllWitnesse = tryCatchWrapper(async function (req, res, next) {
  let sql = "SELECT * from witnesses";
  const [rows] = await pool.query(sql);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ notes: rows });
});

/**
 * @description Get Single note
 * @route GET /notes/:id
 */
export const getSingleWitnesse = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  const note = await getWitnesse(id);
  if (!note) return next(createCustomError("note not found", 404));

  return res.status(200).json(note);
});

/**
 * @description Create note
 * @route POST /notes
 */
export const createWitnesse = tryCatchWrapper(async function (req, res, next) {
  const { name, contact_number, statement } = req.body;
  if (!name || !contact_number || !statement)
  return next(createCustomError("All fields are required", 400));
const [rows] = await pool.query("SELECT MAX(witness_id) AS id FROM witnesses");
console.log( rows[0].id);
  let sql = "INSERT INTO witnesses (witness_id , name, contact_number, statement) VALUES (?, ?, ?, ?)";
  await pool.query(sql, [rows[0].id+1, name, contact_number, statement]);

  return res.status(201).json({ message: "Witnesse has been created" });
});

/**
 * @description Update note
 * @route PATCH /notes/:id
 */
export const updateWitnesse = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;
  const {name, contact_number, statement } = req.body;

  if (!id || !name || !contact_number || !statement)
    return next(createCustomError("All fields are required", 400));

  const note = await getWitnesse(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "UPDATE witnesses SET name = ?, contact_number = ?, statement = ? WHERE witness_id = ?";
  await pool.query(sql, [name, contact_number, statement, id]);

  return res.status(201).json({ message: "witnesses has been updated" });
});

/**
 * @description Delete witnesses
 * @route DELETE /notes/:id
 */
export const deleteWitnesse = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  if (!id) return next(createCustomError("Id is required", 400));

  const note = await getWitnesse(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "DELETE FROM witnesses WHERE witness_id = ?";
  await pool.query(sql, [id]);

  return res.status(200).json({ message: "witnesses has been deleted" });
});
