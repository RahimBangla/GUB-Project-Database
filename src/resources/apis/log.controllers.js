import { pool } from "../../db/connect.js";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";

/**
 * @returns note object
 */
async function getLog(id) {
  let sql = "SELECT * FROM logs WHERE log_id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

/**
 * @description Get All note
 * @route GET /notes
 */
export const getAllLog = tryCatchWrapper(async function (req, res, next) {
  let sql = "SELECT * from logs";
  const [rows] = await pool.query(sql);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ data: rows });
});

/**
 * @description Get Single note
 * @route GET /notes/:id
 */
export const getSingleLog = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  const note = await getLog(id);
  if (!note) return next(createCustomError("note not found", 404));

  return res.status(200).json(note);
});

/**
 * @description Create note
 * @route POST /notes
 */
export const createLog = tryCatchWrapper(async function (req, res, next) {
  const { user_id, case_id } = req.body;
  if (!user_id || !case_id)
  return next(createCustomError("All fields are required", 400));
  let sql = "INSERT INTO logs ( user_id, case_id) VALUES (?, ?)";
  await pool.query(sql, [ user_id, case_id]);

  return res.status(201).json({ message: "Log has been created" });
});

/**
 * @description Update note
 * @route PATCH /notes/:id
 */
export const updateLog = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;
  const { user_id, case_id  } = req.body;

  if (!id || !user_id || !case_id)
    return next(createCustomError("All fields are required", 400));

  const note = await getLog(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "UPDATE logs SET user_id = ?, case_id = ?  WHERE log_id = ?";
  await pool.query(sql, [user_id, case_id, id]);

  return res.status(201).json({ message: "log has been updated" });
});

/**
 * @description Delete note
 * @route DELETE /notes/:id
 */
export const deleteLog = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  if (!id) return next(createCustomError("Id is required", 400));

  const note = await getLog(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "DELETE FROM logs WHERE log_id = ?";
  await pool.query(sql, [id]);

  return res.status(200).json({ message: "log has been deleted" });
});
