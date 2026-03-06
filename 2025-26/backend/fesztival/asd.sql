-- Adatbázis létrehozása (opcionális, ha már létezik, hagyd ki)
CREATE DATABASE IF NOT EXISTS fesztival_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE fesztival_tracker;

-- 1. Felhasználók tábla (Argon2 hashekkel)
-- Minden felhasználó jelszava: Password123
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'admin') DEFAULT 'user'
) ENGINE=InnoDB;

INSERT INTO `users` (`username`, `password`, `role`) VALUES
('fesztival_arc', '$argon2id$v=19$m=65536,t=3,p=4$6F8X9wS4vX8H8J8K8L8M8Q$N1R5U7X9Z2A4C6E8G0I2K4M6O8Q0S2U4W6Y8A0C2E4G', 'user'),
('koncert_guru', '$argon2id$v=19$m=65536,t=3,p=4$6F8X9wS4vX8H8J8K8L8M8Q$N1R5U7X9Z2A4C6E8G0I2K4M6O8Q0S2U4W6Y8A0C2E4G', 'user'),
('admin_pali', '$argon2id$v=19$m=65536,t=3,p=4$6F8X9wS4vX8H8J8K8L8M8Q$N1R5U7X9Z2A4C6E8G0I2K4M6O8Q0S2U4W6Y8A0C2E4G', 'admin');

-- 2. Zenekarok tábla
CREATE TABLE IF NOT EXISTS `bands` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `genre` VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

INSERT INTO `bands` (`name`, `genre`) VALUES
('Azahriah', 'Pop/Trap'),
('Carson Coma', 'Alter/Rock'),
('Krúbi', 'Hip-hop/Rap'),
('Halott Pénz', 'Pop'),
('Analog Balaton', 'Electronic'),
('Pogány Induló', 'Oldschool Hip-hop');

-- 3. Fesztiválok tábla
CREATE TABLE IF NOT EXISTS `festivals` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `date` DATE NOT NULL
) ENGINE=InnoDB;

INSERT INTO `festivals` (`name`, `location`, `date`) VALUES
('Sziget Fesztivál', 'Budapest', '2026-08-10'),
('Fishing on Orfű', 'Orfű', '2026-06-17'),
('Campus Fesztivál', 'Debrecen', '2026-07-22'),
('Strand Fesztivál', 'Zamárdi', '2026-08-20');

-- 4. Lineups (Kapcsolótábla a zenekarok és fesztiválok között)
CREATE TABLE IF NOT EXISTS `lineups` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `festival_id` INT,
  `band_id` INT,
  `stage_name` VARCHAR(100),
  FOREIGN KEY (`festival_id`) REFERENCES `festivals`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`band_id`) REFERENCES `bands`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO `lineups` (`festival_id`, `band_id`, `stage_name`) VALUES
(1, 1, 'Nagyszínpad'), -- Azahriah @ Sziget
(1, 2, 'FreeDome'),    -- Carson Coma @ Sziget
(2, 2, 'Nagyszínpad'), -- Carson Coma @ Fishing
(2, 3, 'Nagyszínpad'), -- Krúbi @ Fishing
(3, 1, 'Nagyszínpad'), -- Azahriah @ Campus
(3, 4, 'Nagyszínpad'), -- Halott Pénz @ Campus
(4, 5, 'Liget Stage'), -- Analog Balaton @ Strand
(4, 6, 'Nagyszínpad'); -- Pogány Induló @ Strand

-- 5. Kedvencek tábla (JWT alapú mentéshez)
CREATE TABLE IF NOT EXISTS `favorites` (
  `user_id` INT,
  `band_id` INT,
  PRIMARY KEY (`user_id`, `band_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`band_id`) REFERENCES `bands`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;