-- Creates the "Bamazon" database --
CREATE DATABASE Bamazon;

-- Makes it so all of the following code will affect animals_db --
USE Bamazon;

-- Creates the table "people" within animals_db --
CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price float(10,2) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Raisin Bran", "Cereal", 4.25, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hummus", "Snacks", 3.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee", "Coffee", 12.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sparkling Water", "Liquids", 3.50, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eggs", "Dairy", 1.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Almond Milk", "Dairy", 3.50, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soy Sauce", "International Foods", 1.99, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grapes", "Produce", 3.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chicken", "Meat", 4.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("English Muffin", "Bread", 2.00, 100);

