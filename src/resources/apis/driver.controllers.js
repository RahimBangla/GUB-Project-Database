import { pool } from "../../db/connect.js";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";

/**
 * @returns note object
 */
async function getDrivers(id) {
  let sql = "SELECT * FROM drivers WHERE driver_id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

/**
 * @description Get All note
 * @route GET /notes
 */
export const getAllDrivers = tryCatchWrapper(async function (req, res, next) {
  let sql = "SELECT * from drivers";
  const [rows] = await pool.query(sql);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ data: rows });
});

/**
 * @description Get Single note
 * @route GET /notes/:id
 */
export const getSingleDrivers = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  const note = await getDrivers(id);
  if (!note) return next(createCustomError("note not found", 404));

  return res.status(200).json(note);
});

/**
 * @description Create note
 * @route POST /notes
 */
export const createDrivers = tryCatchWrapper(async function (req, res, next) {
  const { vehicle_id, nid_number, license_number, contact_number, age } = req.body;
  if (!vehicle_id || !nid_number || !license_number || !contact_number || !age)
  return next(createCustomError("All fields are required", 400));
  let sql = "INSERT INTO drivers (vehicle_id , nid_number, license_number, contact_number, age) VALUES (?, ?, ?, ?, ?)";
  await pool.query(sql, [vehicle_id, nid_number, license_number, contact_number, age]);

  return res.status(201).json({ message: "Drivers has been created" });
});

/**
 * @description Update note
 * @route PATCH /notes/:id
 */
export const updateDrivers = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;
  const { vehicle_id, nid_number, license_number, contact_number, age  } = req.body;

  if (!id || !vehicle_id || !nid_number || !license_number || !contact_number || !age)
    return next(createCustomError("All fields are required", 400));

  const note = await getDrivers(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "UPDATE Drivers SET vehicle_id = ?, nid_number = ?, license_number = ?, contact_number = ?, age = ? WHERE driver_id = ?";
  await pool.query(sql, [vehicle_id, nid_number, license_number, contact_number, age]);

  return res.status(201).json({ message: "Drivers has been updated" });
});

/**
 * @description Delete note
 * @route DELETE /notes/:id
 */
export const deleteDrivers = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  if (!id) return next(createCustomError("Id is required", 400));

  const note = await getDrivers(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "DELETE FROM Drivers WHERE driver_id = ?";
  await pool.query(sql, [id]);

  return res.status(200).json({ message: "Drivers has been deleted" });
});
