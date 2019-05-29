CREATE TABLE
IF NOT EXISTS opportunities
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT
(64) NOT NULL,
time_frame TEXT
(64) NOT NULL,
  duty TEXT
(600) NOT NULL,
pic Text
(600) NOT NULL
);



CREATE TABLE
IF NOT EXISTS applications
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  opportunity TEXT
(64) NOT NULL,
first_name TEXT
(64) NOT NULL,
  surname TEXT
(64) NOT NULL,
email Text
(64) NOT NULL,
note Text
(2000),  
response Text
(2000)
);

CREATE TABLE admins
(    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);



