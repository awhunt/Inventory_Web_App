

CREATE TABLE Items (
	sku VARCHAR(20) PRIMARY KEY, 
	descr VARCHAR(200),
	loc VARCHAR(5),
	QOH VARCHAR(20),
	price REAL,
	QOO INT,
	fineline INT,
	dept_id INT,
	class INT,
	promo REAL,
	FOREIGN KEY(dept_id) REFERENCES Depts(dept_id),
	FOREIGN KEY(class) REFERENCES Depts(class), 
	FOREIGN KEY(fineline) REFERENCES Depts(fineline) 
);


-- CREATE TABLE Depts (
-- 	dept_id INT,
-- 	fineline INT,
-- 	class INT,
-- 	sku VARCHAR(20),
-- 	PRIMARY KEY (sku)co,
-- 	FOREIGN KEY(dept_id) REFERENCES Items(dept_id),
-- 	FOREIGN KEY(class) REFERENCES Items(class), 
-- 	FOREIGN KEY(fineline) REFERENCES Items(fineline) 
-- );

-- .mode csv

-- .import data.csv Items

--  delete from Items where descr like "%Description%";
