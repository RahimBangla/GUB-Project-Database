CREATE TABLE `Users` (
  `id` INT PRIMARY KEY,
  `fullName` VARCHAR(255),
  `username` VARCHAR(255),
  `password_hash` VARCHAR(255),
  `role` INT,
  `created` DateTime
);

CREATE TABLE `AccidentCases` (
  `case_id` INT PRIMARY KEY,
  `victim_id` INT,
  `vehicle_id` INT,
  `police_id` INT,
  `witness_id` INT,
  `location` VARCHAR(255),
  `date_occurred` DateTime,
  `description` TEXT,
  `status` VARCHAR(50) DEFAULT "Pending"
);

CREATE TABLE `Victims` (
  `victim_id` INT PRIMARY KEY,
  `name` VARCHAR(255),
  `age` INT,
  `gender` VARCHAR(10),
  `injury_type` VARCHAR(255)
);

CREATE TABLE `Witnesses` (
  `witness_id` INT PRIMARY KEY,
  `name` VARCHAR(255),
  `contact_number` VARCHAR(15),
  `statement` TEXT
);

CREATE TABLE `Vehicles` (
  `vehicle_id` INT PRIMARY KEY,
  `vehicle_type` VARCHAR(50),
  `mechanical_problem` TEXT,
  `license_number` VARCHAR(20)
);

CREATE TABLE `Drivers` (
  `driver_id` INT PRIMARY KEY,
  `vehicle_id` INT,
  `nid_number` VARCHAR(20),
  `license_number` VARCHAR(20),
  `contact_number` VARCHAR(15),
  `age` INT
);

CREATE TABLE `TrafficPolice` (
  `police_id` INT PRIMARY KEY,
  `name` VARCHAR(255),
  `badge_number` VARCHAR(20),
  `contact_number` VARCHAR(15)
);

CREATE TABLE `Logs` (
  `log_id` INT PRIMARY KEY,
  `user_id` INT,
  `case_id` INT,
  `created` DateTime
);

ALTER TABLE `AccidentCases` ADD FOREIGN KEY (`victim_id`) REFERENCES `Victims` (`victim_id`);

ALTER TABLE `AccidentCases` ADD FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicles` (`vehicle_id`);

ALTER TABLE `AccidentCases` ADD FOREIGN KEY (`police_id`) REFERENCES `TrafficPolice` (`police_id`);

ALTER TABLE `AccidentCases` ADD FOREIGN KEY (`witness_id`) REFERENCES `Witnesses` (`witness_id`);

ALTER TABLE `Drivers` ADD FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicles` (`vehicle_id`);
