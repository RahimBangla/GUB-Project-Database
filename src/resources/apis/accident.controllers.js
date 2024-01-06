import { pool } from "../../db/connect.js";
import { createCustomError } from "../../errors/customErrors.js";
import { tryCatchWrapper } from "../../middlewares/tryCatchWrapper.js";

/**
 * @returns note object
 */
async function getAccident(id) {
  let sql = "SELECT * FROM accidentcases WHERE case_id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
}

/**
 * @description Get All note
 * @route GET /notes
 */
export const getCountAccident = tryCatchWrapper(async function (req, res, next) {
  var count = 19;
  var series = [];
  let sql = "SELECT count(*) as countValue from accidentcases where DATE(date_occurred) = ? ";
  //if (!rows.length) return res.status(204).json({ message: "empty list" });
  var i = 0;
  var lastDate = new Date().setDate(new Date().getDate() - 18);
  var x = new Date(lastDate).getTime();
  while (i < count) {
    console.log(formatDate(new Date(x)));
    const [rows] = await pool.query(sql, [ formatDate(new Date(x))]);
    console.log(rows[0].countValue);
    series.push([x, rows[0].countValue]);
    x += 86400000;
     i++;
  }
  // console.log(series);
  // console.log(rows.countValue);
  // data.push(rows.countValue || 0);
  return res.status(200).json({ data: series, status: true });
});
const formatDate = (date) =>{
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
  var day = ('0' + date.getDate()).slice(-2);

  return year + '-' + month + '-' + day;
}
/**
 * @description Get All note
 * @route GET /notes
 */
export const getAllAccident = tryCatchWrapper(async function (req, res, next) {
  let sql = "SELECT * from accidentcases";
  const [rows] = await pool.query(sql);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ data: rows, status: true });
});
/**
 * @description Get All note
 * @route GET /notes
 */
export const getAllAccidentJoin = tryCatchWrapper(async function (req, res, next) {
  let sql = "SELECT case_id, location, description, date_occurred, status, Vi.name as victim_id, Ve.vehicle_type as vehicle_id, T.name as police_id, W.name as witness_id FROM accidentcases A INNER JOIN victims Vi on A.victim_id = Vi.victim_id INNER JOIN vehicles Ve on A.vehicle_id = Ve.vehicle_id INNER JOIN trafficpolice T ON A.police_id = T.police_id INNER JOIN witnesses W ON A.witness_id = W.witness_id ORDER BY A.date_occurred ASC;";
  const [rows] = await pool.query(sql);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ data: rows, status: true });
});

/**
 * @description Get All note
 * @route GET /notes
 */
export const getAllAccidentJoinSearch = tryCatchWrapper(async function (req, res, next) {

  let sql = `SELECT A.case_id, A.location, A.description, A.date_occurred, A.STATUS, Vi.name AS victim_id, Ve.vehicle_type AS vehicle_id, T.name AS police_id, W.name AS witness_id FROM accidentcases A INNER JOIN victims Vi ON A.victim_id = Vi.victim_id INNER JOIN vehicles Ve ON A.vehicle_id = Ve.vehicle_id INNER JOIN trafficpolice T ON A.police_id = T.police_id INNER JOIN witnesses W ON A.witness_id = W.witness_id WHERE CONCAT(A.case_id, A.location, A.description, A.date_occurred, A.STATUS, Vi.name, Ve.vehicle_type, T.name, W.name) LIKE ? ORDER BY A.date_occurred ASC;`;
  const [rows] = await pool.query(sql, `%`+req.params.search+`%`);
  if (!rows.length) return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ data: rows, status: true });
});

/**
 * @description Get All note
 * @route GET /notes
 */
export const getInjure = tryCatchWrapper(async function (req, res, next) {

  let sql = "SELECT COUNT(*) AS count FROM accidentcases WHERE DATE(date_occurred) = CURRENT_DATE();";
  const  [r = rows ] = await pool.query(sql);
  let sql2 = "SELECT COUNT(*) AS count FROM accidentcases WHERE DATE(date_occurred) = DATE_SUB(CURDATE(), INTERVAL 1 DAY);";
  const  [s = rows ] = await pool.query(sql2);
  let sql3 = "SELECT COUNT(*) AS count FROM accidentcases WHERE YEAR(date_occurred) = YEAR(CURDATE()) AND MONTH(date_occurred) = MONTH(CURDATE());";
  const  [m = rows ] = await pool.query(sql3);
  let sql4 = "SELECT COUNT(*) AS count FROM accidentcases;";
  const  [t = rows ] = await pool.query(sql4);
  //if (!r.length) return res.status(204).json({ data: {today: 0, yesterday:0, month:0, total: 0}, status: true });

  return res.status(200).json({ data: {today:r[0].count || 0, yesterday:s[0].count||0, month:m[0].count ||0, total: t[0].count || 0}, status: true });
});

/**
 * @description Get Single note
 * @route GET /notes/:id
 */
export const getSingleAccident = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  const note = await getAccident(id);
  if (!note) return next(createCustomError("note not found", 404));

  return res.status(200).json(note);
});

/**
 * @description Create note
 * @route POST /notes
 */
export const createAccident = tryCatchWrapper(async function (req, res, next) {
  const { victim_id, vehicle_id, police_id, witness_id, location, description, status, user_id } = req.body;
  if (!victim_id || !vehicle_id || !police_id || !witness_id || !location || !description || !status || !user_id)
  return next(createCustomError("All fields are required", 400));
  console.log(`${victim_id}, ${vehicle_id}, ${police_id}, ${witness_id}, ${location}, ${description}, ${status}`);
  let sql = "INSERT INTO accidentcases ( victim_id, vehicle_id, police_id, witness_id, location, description, status) VALUES ( ?, ?, ?, ?, ?, ?, ?)";
  await pool.query(sql, [ victim_id, vehicle_id, police_id, witness_id, location, description, status]);

  return res.status(201).json({ message: "Accident has been created", status: true  });
});

/**
 * @description Update note
 * @route PATCH /notes/:id
 */
export const updateAccident = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;
  const { victim_id, vehicle_id, police_id, witness_id, location, description, status  } = req.body;

  if (!id || !victim_id || !vehicle_id || !police_id || !witness_id || !location || !description || !status)
    return next(createCustomError("All fields are required", 400));

  const note = await getAccident(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "UPDATE accidentcases SET victim_id = ?, vehicle_id = ?, police_id = ?, witness_id = ?, location = ?, description = ?, status = ? WHERE case_id = ?";
  await pool.query(sql, [victim_id, vehicle_id, police_id, witness_id, location, description, status, id]);

  return res.status(201).json({ message: "Accident has been updated", status: true  });
});

/**
 * @description Delete note
 * @route DELETE /notes/:id
 */
export const deleteAccident = tryCatchWrapper(async function (req, res, next) {
  const { id } = req.params;

  if (!id) return next(createCustomError("Id is required", 400));

  const note = await getAccident(id);
  if (!note) return next(createCustomError("note not found", 404));

  let sql = "DELETE FROM accidentcases WHERE case_id = ?";
  await pool.query(sql, [id]);

  return res.status(200).json({ message: "Accident has been deleted", status: true  });
});
