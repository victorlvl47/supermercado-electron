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
  `contrasena_usuario` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `numero_usuario_UNIQUE` (`numero_usuario` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermercado_electron`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supermercado_electron`.`productos` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `nombre_producto` VARCHAR(255) NOT NULL,
  `descripcion_producto` TEXT(255) NOT NULL,
  `categoria_producto` VARCHAR(255) NOT NULL,
  `inventario_producto` INT NOT NULL,
  PRIMARY KEY (`id_producto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermercado_electron`.`proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supermercado_electron`.`proveedores` (
  `id_proveedor` INT NOT NULL AUTO_INCREMENT,
  `nombre_proveedor` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_proveedor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `supermercado_electron`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `supermercado_electron`.`pedidos` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NOT NULL,
  `id_proveedor` INT NOT NULL,
  `cantidad_pedido` INT NOT NULL,
  PRIMARY KEY (`id_pedido`, `id_producto`, `id_proveedor`),
  INDEX `fk_pedidos_productos_idx` (`id_producto` ASC) VISIBLE,
  INDEX `fk_pedidos_proveedores1_idx` (`id_proveedor` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_productos`
    FOREIGN KEY (`id_producto`)
    REFERENCES `supermercado_electron`.`productos` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_proveedores1`
    FOREIGN KEY (`id_proveedor`)
    REFERENCES `supermercado_electron`.`proveedores` (`id_proveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;




-- ------------------------------------------------------------------------
-- 
-- Insert data to DB
-- 

-- Usuarios --
-- user1 password: password1
-- user2 password: password2
-- user3 password: password3
INSERT INTO usuarios (nombre_usuario, numero_usuario, contrasena_usuario)
VALUES 
('user1', '123456789', '$2b$10$.gV3hKJcURC2mz00Anm1ie9kPKcpCLCfhNMRsRIAqOI8C1.yuTk6y'),
('user2', '987654321', '$2b$10$YEvUaUNRyNhV7afz39QTBupJm2maVtWFFUIpKRu0eLyTLdjAXOUO2'),
('user3', '555555555', '$2b$10$SKYT3uoDCqkl3k1V0RpdiO6Ry8bNhm7rQ7xEMb8sC4f2yLfN33GdS');




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
(6, 'ProveedorTech'),
(7, 'GreenNature S.A.'),
(8, 'Suministros Industriales del Norte'),
(9, 'CentralCompras Ltda.'),
(10, 'Abastecedora Nacional de Productos');




-- Pedidos --
INSERT INTO pedidos (id_proveedor, id_producto, cantidad_pedido) 
VALUES 
(1, 1, 10), 
(2, 3, 5), 
(3, 2, 7), 
(4, 4, 12), 
(5, 5, 3);

-- ------------------------------------------------------------------------
