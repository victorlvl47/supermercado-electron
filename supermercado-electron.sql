-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema supermercado_electron
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema supermercado_electron
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `supermercado_electron` DEFAULT CHARACTER SET utf8 ;
USE `supermercado_electron` ;

-- -----------------------------------------------------
-- Table `supermercado_electron`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supermercado_electron`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(45) NOT NULL,
  `numero_usuario` VARCHAR(15) NOT NULL,
  `contrasena_usuario` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



-- ------------------------------------------------------------------------
-- 
-- Insert data to DB
-- 

-- Usuarios --
INSERT INTO usuarios (nombre_usuario, numero_usuario, contrasena_usuario)
VALUES 
('user1', '123456789', 'password1'),
('user2', '987654321', 'password2'),
('user3', '555555555', 'password3');




-- Productos --
INSERT INTO productos (nombre_producto, descripcion_producto, categoria_producto, inventario_producto) VALUES
("Leche Entera", "Leche fresca con un contenido graso del 3.5%", "Lácteos", 50), 
("Manzanas", "Fruta fresca y jugosa de color rojo y verde", "Frutas",	100), 
("Cereal de Avena", "Cereal de avena integral y saludable con trozos de fruta deshidratada", "Desayunos", 20),
("Pan Blanco", "Pan blanco recién horneado con una corteza crujiente y una miga suave", "Panadería", 30),
("Pañales para Bebé", "Pañales desechables para bebés con una capacidad de absorción de hasta 12 horas", "Bebés", 80),
("Café Molido", "Café molido de tueste medio con un sabor intenso y equilibrado", "Café", 40),
("Naranjas", "Naranjas frescas", "Frutas", 205), 
('Product 1', 'Description 1', 'Category A', 10),
('Product 2', 'Description 2', 'Category A', 20),
('Product 3', 'Description 3', 'Category B', 30),
('Product 4', 'Description 4', 'Category B', 40),
('Product 5', 'Description 5', 'Category C', 50),
('Product 6', 'Description 6', 'Category C', 60),
('Product 7', 'Description 7', 'Category C', 70);




-- Proveedores --
INSERT INTO proveedores (id_proveedor, nombre_proveedor) VALUES
(1, 'Proveedor A'),
(2, 'Proveedor B'),
(3, 'Proveedor C'),
(4, 'Proveedor D'),
(5, 'Proveedor E'), 
(1, 'ProveedorTech'),
(2, 'GreenNature S.A.'),
(3, 'Suministros Industriales del Norte'),
(4, 'CentralCompras Ltda.'),
(5, 'Abastecedora Nacional de Productos');

-- ------------------------------------------------------------------------
