DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT AUTO-INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL (10,2),
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES("pajamas","clothing",9.98,35), ("couch","furniture",150,10),("television","electronics",200,5),
    ("chips","groceries",1.85,80),("beer","groceries",6.97,20),("ottoman","furniture",50,5),
    ("alexa","electronics",75,15),("socks","clothing",3,25),("blanket","housewares",9.50,75),
    ("air fryer","housewares",99,5);