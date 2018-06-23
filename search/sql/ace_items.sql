CREATE TABLE Items (
	sku VARCHAR(20) NOT NULL, 
	descr VARCHAR(200) NOT NULL,
	loc VARCHAR(5) NOT NULL,
	QOH VARCHAR(20) NOT NULL,
	upc VARCHAR(20) NOT NULL,
	price REAL NOT NULL,
	dept_id INT NOT NULL,
	promo REAL,
	PRIMARY KEY(sku)
);

