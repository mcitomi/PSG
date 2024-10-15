-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Okt 14. 20:56
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `autok`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `autok`
--

CREATE TABLE `autok` (
  `id` int(11) NOT NULL,
  `tulaj_id` int(11) DEFAULT NULL,
  `evjarat` int(11) DEFAULT NULL,
  `marka` varchar(100) DEFAULT NULL,
  `tipusa` varchar(100) DEFAULT NULL,
  `uzemanyag_tipus` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `autok`
--

INSERT INTO `autok` (`id`, `tulaj_id`, `evjarat`, `marka`, `tipusa`, `uzemanyag_tipus`) VALUES
(1, 1, 2008, 'BMW', '3 Series', 'benzin'),
(2, 2, 2022, 'Mercedes', 'C63 AMG', 'benzin'),
(3, 3, 2021, 'Audi', 'RS7', 'benzin'),
(4, 4, 2020, 'BMW', '5 Series', 'dizel'),
(5, 5, 2008, 'Volkswagen', 'Passat', 'dizel');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tulajdonos_tulajdonsagok`
--

CREATE TABLE `tulajdonos_tulajdonsagok` (
  `id` int(11) NOT NULL,
  `tulaj_id` int(11) DEFAULT NULL,
  `lakhely` varchar(100) DEFAULT NULL,
  `eletkor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tulajdonos_tulajdonsagok`
--

INSERT INTO `tulajdonos_tulajdonsagok` (`id`, `tulaj_id`, `lakhely`, `eletkor`) VALUES
(1, 1, 'Budapest', 30),
(2, 2, 'Budapest', 40),
(3, 3, 'Gödöllő', 40),
(4, 4, 'Valkó', 35),
(5, 5, 'Veresegyház', 23);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tulajok`
--

CREATE TABLE `tulajok` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tulajok`
--

INSERT INTO `tulajok` (`id`, `nev`) VALUES
(1, 'Károly'),
(2, 'Lajos'),
(3, 'István'),
(4, 'Bence'),
(5, 'Máté');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `autok`
--
ALTER TABLE `autok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tulaj_id` (`tulaj_id`);

--
-- A tábla indexei `tulajdonos_tulajdonsagok`
--
ALTER TABLE `tulajdonos_tulajdonsagok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tulaj_id` (`tulaj_id`);

--
-- A tábla indexei `tulajok`
--
ALTER TABLE `tulajok`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `autok`
--
ALTER TABLE `autok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `tulajdonos_tulajdonsagok`
--
ALTER TABLE `tulajdonos_tulajdonsagok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `tulajok`
--
ALTER TABLE `tulajok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `autok`
--
ALTER TABLE `autok`
  ADD CONSTRAINT `autok_ibfk_1` FOREIGN KEY (`tulaj_id`) REFERENCES `tulajok` (`id`);

--
-- Megkötések a táblához `tulajdonos_tulajdonsagok`
--
ALTER TABLE `tulajdonos_tulajdonsagok`
  ADD CONSTRAINT `tulajdonos_tulajdonsagok_ibfk_1` FOREIGN KEY (`tulaj_id`) REFERENCES `tulajok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
