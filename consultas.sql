CREATE TABLE heroes(
    id INT(11) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    poder VARCHAR(50) NOT NULL
);

ALTER TABLE heroes
    ADD PRIMARY KEY (id);

ALTER TABLE heroes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;


INSERT INTO heroes VALUES(default, 'Ironman', 'Dinero e Ingenieria');
INSERT INTO heroes VALUES(default,'Hulk', 'Rayos gama');
INSERT INTO heroes VALUES(default,'Warmachine', 'Ser amigo de Tony');
INSERT INTO heroes VALUES(default,'Spiderman', 'Poderes de araña');

update mysql.user set authentication_string=password(''), plugin='mysql_native_password' where user='root';