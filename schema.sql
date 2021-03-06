/*   psql -d postgres -a -f ./schema.sql    */
\connect template1;
DROP DATABASE IF EXISTS barttransit;
CREATE DATABASE barttransit;
\connect barttransit;

-- DROP DATABASE IF EXISTS barttransit;

-- CREATE DATABASE barttransit;

-- USE barttransit;

CREATE TABLE stations (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  is_favorite boolean NOT NULL default false
);

CREATE TABLE stops (
  id serial PRIMARY KEY,
  line_id int NOT NULL,
  station_id int NOT NULL,
  is_transfer boolean NOT NULL default false
);

CREATE TABLE service_lines (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  color char(6) NOT NULL,
  origin_id int NOT NULL,
  destination_id int NOT NULL
);

-- stations
INSERT into stations (name) VALUES ('12th St/Oakland City Center');
INSERT into stations (name) VALUES ('16th St/Mission');
INSERT into stations (name) VALUES ('19th St/Oakland');
INSERT into stations (name) VALUES ('24th St/Mission');
INSERT into stations (name) VALUES ('Ashby');
INSERT into stations (name) VALUES ('Balboa Park');
INSERT into stations (name) VALUES ('Bay Fair');
INSERT into stations (name) VALUES ('Castro Valley');
INSERT into stations (name) VALUES ('Civic Center');
INSERT into stations (name) VALUES ('Coliseum');
INSERT into stations (name) VALUES ('Colma');
INSERT into stations (name) VALUES ('Concord');
INSERT into stations (name) VALUES ('Daly City');
INSERT into stations (name) VALUES ('Downtown Berkeley');
INSERT into stations (name) VALUES ('Dublin/Pleasanton');
INSERT into stations (name) VALUES ('El Cerrito del Norte');
INSERT into stations (name) VALUES ('El Cerrito Plaza');
INSERT into stations (name) VALUES ('Embarcadero');
INSERT into stations (name) VALUES ('Fremont');
INSERT into stations (name) VALUES ('Fruitvale');
INSERT into stations (name) VALUES ('Glen Park');
INSERT into stations (name) VALUES ('Hayward');
INSERT into stations (name) VALUES ('Lafayette');
INSERT into stations (name) VALUES ('Lake Merritt');
INSERT into stations (name) VALUES ('MacArthur');
INSERT into stations (name) VALUES ('Millbrae');
INSERT into stations (name) VALUES ('Montgomery St.');
INSERT into stations (name) VALUES ('North Berkeley');
INSERT into stations (name) VALUES ('North Concord/Martinez');
INSERT into stations (name) VALUES ('Orinda');
INSERT into stations (name) VALUES ('Pittsburg/Bay Point');
INSERT into stations (name) VALUES ('Pleasant Hill/Contra Costa Centre');
INSERT into stations (name) VALUES ('Powell St.');
INSERT into stations (name) VALUES ('Richmond');
INSERT into stations (name) VALUES ('Rockridge');
INSERT into stations (name) VALUES ('San Bruno');
INSERT into stations (name) VALUES ('San Francisco International Airport');
INSERT into stations (name) VALUES ('San Leandro');
INSERT into stations (name) VALUES ('South Hayward');
INSERT into stations (name) VALUES ('South San Francisco');
INSERT into stations (name) VALUES ('Union City');
INSERT into stations (name) VALUES ('Walnut Creek');
INSERT into stations (name) VALUES ('Warm Springs/South Fremont');
INSERT into stations (name) VALUES ('West Dublin/Pleasanton');
INSERT into stations (name) VALUES ('West Oakland');

-- service_lines
INSERT into service_lines (name, color, origin_id, destination_id) VALUES ('Red: towards Richmond', 'e11a57', 26, 34);
INSERT into service_lines (name, color, origin_id, destination_id) VALUES ('Red: towards Millbrae', 'e11a57', 34, 26); 
INSERT into service_lines (name, color, origin_id, destination_id) VALUES ('Yellow: towards Pittsburg/Bay Point', 'fdf057', 26, 31); 
INSERT into service_lines (name, color, origin_id, destination_id) VALUES ('Yellow: towards Millbrae', 'fdf057', 31, 26);
INSERT into service_lines (name, color, origin_id, destination_id) VALUES ('Blue: towards Daly City', '2aabe2', 15, 13);
INSERT into service_lines (name, color, origin_id, destination_id) VALUES ('Blue: towards Dublin/Pleasanton', '2aabe2', 13, 15);
INSERT into service_lines (name, color, origin_id, destination_id) VALUES ('Green: towards Warm Springs', '4fb848', 13, 43);
INSERT into service_lines (name, color, origin_id, destination_id) VALUES ('Green: towards Daly City', '4fb848', 43, 13);
INSERT into service_lines (name, color, origin_id, destination_id) VALUES ('Orange: towards Richmond', 'f9a11d', 43, 34);
INSERT into service_lines (name, color, origin_id, destination_id) VALUES ('Orange: towards Warm Springs', 'f9a11d', 34, 43);

-- stops
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 26, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 37, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 36, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 40, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 11, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 13, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 6, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 21, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 4, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 2, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 9, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 33, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 27, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 18, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 45, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 1, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 3, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 25, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 5, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 14, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 28, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 17, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 16, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (1, 34, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 34, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 16, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 17, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 28, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 14, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 5, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 25, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 3, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 1, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 45, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 18, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 27, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 33, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 9, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 2, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 4, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 21, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 6, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 13, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 11, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 40, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 36, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 37, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (2, 26, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 26, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 37, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 36, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 40, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 11, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 13, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 6, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 21, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 4, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 2, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 9, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 33, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 27, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 18, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 45, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 1, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 3, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 25, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 35, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 30, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 23, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 42, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 32, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 12, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 29, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (3, 31, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 31, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 29, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 12, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 32, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 42, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 23, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 30, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 35, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 25, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 3, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 1, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 45, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 18, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 27, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 33, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 9, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 2, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 4, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 21, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 6, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 13, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 11, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 40, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 36, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 37, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (4, 26, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 15, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 44, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 8, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 7, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 38, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 10, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 20, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 24, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 45, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 18, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 27, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 33, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 9, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 2, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 4, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 21, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 6, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (5, 13, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 13, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 6, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 21, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 4, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 2, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 9, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 33, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 27, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 18, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 45, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 24, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 20, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 10, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 38, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 7, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 8, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 44, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (6, 15, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 13, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 6, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 21, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 4, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 2, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 9, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 33, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 27, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 18, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 45, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 24, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 20, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 10, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 38, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 7, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 22, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 39, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 41, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 19, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (7, 43, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 43, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 19, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 41, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 39, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 22, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 7, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 38, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 10, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 20, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 24, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 45, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 18, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 27, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 33, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 9, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 2, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 4, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 21, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 6, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (8, 13, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 34, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 16, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 17, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 28, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 14, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 5, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 25, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 3, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 1, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 24, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 20, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 10, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 38, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 7, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 22, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 39, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 41, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 19, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (10, 43, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 43, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 19, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 41, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 39, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 22, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 7, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 38, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 10, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 20, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 24, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 1, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 3, true);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 25, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 5, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 14, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 28, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 17, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 16, false);
INSERT into stops (line_id, station_id, is_transfer) VALUES (9, 34, false);