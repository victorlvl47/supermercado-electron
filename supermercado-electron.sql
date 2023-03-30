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
('Product 1', 'Description 1', 'Category A', 10),
('Product 2', 'Description 2', 'Category A', 20),
('Product 3', 'Description 3', 'Category B', 30),
('Product 4', 'Description 4', 'Category B', 40),
('Product 5', 'Description 5', 'Category C', 50),
('Product 6', 'Description 6', 'Category C', 60),
('Product 7', 'Description 7', 'Category C', 70);

-- ------------------------------------------------------------------------
