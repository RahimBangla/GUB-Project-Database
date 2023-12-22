import { pool } from "../../db/connect.js";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";

/**
 * @returns note object
 */
async function getVictim(id) {
  let sql = "SELECT * FROM victims WHERE victim_id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

/**
 * @description Get All note
 * @route GET /notes
 */
export const getAllVictim = tryCatchWrapper(async function (req, res, next) {
  let sql = "SELECT * from victims";
  const [rows] = await pool.query(sql);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ data: rows });
});

/**
 * @description Get Single note
 * @route GET /notes/:id
 */
export const getSingleVictim = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  const note = await getVictim(id);
  if (!note) return next(createCustomError("note not found", 404));

  return res.status(200).json(note);
});

/**
 * @description Create note
 * @route POST /notes
 */
export const createVictim = tryCatchWrapper(async function (req, res, next) {
  const { name,age,  gender, injury_type } = req.body;
  if (!name || !age || !gender || !injury_type)
  return next(createCustomError("All fields are required", 400));
const [rows] = await pool.query("SELECT MAX(victim_id) AS id FROM victims");
console.log( rows[0].id);
  let sql = "INSERT INTO victims (victim_id , name, age, gender, injury_type) VALUES (?, ?, ?, ?)";
  await pool.query(sql, [rows[0].id+1, name, age, gender, injury_type]);

  return res.status(201).json({ message: "Victim has been created" });
});

/**
 * @description Update note
 * @route PATCH /notes/:id
 */
export const updateVictim = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;
  const { name,age,  gender, injury_type  } = req.body;

  if (!id ||!name || !age || !gender || !injury_type)
    return next(createCustomError("All fields are required", 400));

  const note = await getVictim(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "UPDATE victims SET name = ?, age = ?, gender = ?, injury_type = ? WHERE victim_id = ?";
  await pool.query(sql, [name,age,  gender, injury_type, id]);

  return res.status(201).json({ message: "Victim has been updated" });
});

/**
 * @description Delete note
 * @route DELETE /notes/:id
 */
export const deleteVictim = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  if (!id) return next(createCustomError("Id is required", 400));

  const note = await getVictim(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "DELETE FROM victims WHERE victim_id = ?";
  await pool.query(sql, [id]);

  return res.status(200).json({ message: "Victim has been deleted" });
});
