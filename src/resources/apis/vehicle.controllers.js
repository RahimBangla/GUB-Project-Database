import { pool } from "../../db/connect.js";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";

/**
 * @returns note object
 */
async function getVehicle(id) {
  let sql = "SELECT * FROM Vehicles WHERE vehicle_id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

/**
 * @description Get All note
 * @route GET /notes
 */
export const getAllVehicle = tryCatchWrapper(async function (req, res, next) {
  let sql = "SELECT * from Vehicles";
  const [rows] = await pool.query(sql);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ data: rows });
});

/**
 * @description Get Single note
 * @route GET /notes/:id
 */
export const getSingleVehicle = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  const note = await getVehicle(id);
  if (!note) return next(createCustomError("note not found", 404));

  return res.status(200).json(note);
});

/**
 * @description Create note
 * @route POST /notes
 */
export const createVehicle = tryCatchWrapper(async function (req, res, next) {
  const { vehicle_type, mechanical_problem, license_number } = req.body;
  if (!vehicle_type || !mechanical_problem || !license_number)
  return next(createCustomError("All fields are required", 400));
const [rows] = await pool.query("SELECT MAX(vehicle_id) AS id FROM vehicles");
console.log( rows[0].id);
  let sql = "INSERT INTO vehicles (vehicle_id , vehicle_type, mechanical_problem, license_number) VALUES (?, ?, ?, ?)";
  await pool.query(sql, [rows[0].id+1, vehicle_type, mechanical_problem, license_number]);

  return res.status(201).json({ message: "Vehicle has been created" });
});

/**
 * @description Update note
 * @route PATCH /notes/:id
 */
export const updateVehicle = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;
  const { vehicle_type, mechanical_problem, license_number  } = req.body;

  if (!id || !vehicle_type || !mechanical_problem || !license_number)
    return next(createCustomError("All fields are required", 400));

  const note = await getVehicle(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "UPDATE vehicle SET vehicle_type = ?, mechanical_problem = ?, license_number = ? WHERE vehicle_id = ?";
  await pool.query(sql, [vehicle_type, mechanical_problem, license_number, id]);

  return res.status(201).json({ message: "note has been updated" });
});

/**
 * @description Delete note
 * @route DELETE /notes/:id
 */
export const deleteVehicle = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  if (!id) return next(createCustomError("Id is required", 400));

  const note = await getVehicle(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "DELETE FROM vehicle WHERE vehicle_id = ?";
  await pool.query(sql, [id]);

  return res.status(200).json({ message: "note has been deleted" });
});
