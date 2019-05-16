-- Create a MySQL Database called bamazon

DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;


-- Then create a Table inside of that database called "products".
CREATE TABLE products (
  -- The products table should have each of the following columns:

  -- item_id (unique id for each product)
  item_id INT NOT NULL AUTO_INCREMENT,

  -- Makes a string column called "product_name (Name of product)" which cannot contain null --
  product_name VARCHAR(100) NOT NULL,
 
  -- department_name
  department_name VARCHAR(100) NOT NULL,

  --  price (cost to customer)
  price DECIMAL(10,2) NULL,

  -- stock_quantity (how much of the product is available in stores)
  
  stock_quantity INT NULL

  PRIMARY KEY (id)

);


-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("The Design of Everyday Things","Book",10.43,6);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Benefiber fiber supplement Power","Food",8.99,10);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Bounty Quick-Size Paper Towels","Life",21.99,189);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("24 Bags instant Rice Noodle Chicken Flavour","Food",22.00,2);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Gorilla Super Glue Gel","Life",5.97,29);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Montblanc Rollerball Refills","Life",20.75,3);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("IKproductpro Makeup Mirror","Life",29.99,12);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Everything & Everywhere: A Fact-Filled Adventure for Curious Globe-Trotters","Book",13.37,34);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Baby Memory Book by Tiny Gifts","Book",22.95,6);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("Inomata Raw Rice Storage Container","Life",29.95,15);

