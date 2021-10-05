--CREACION DE LA TABLA
CREATE TABLE FINCA (
    ID NUMBER(10) NOT NULL,
    ADDRESS VARCHAR2(20),
    EXENSION NUMBER(10),
    CATEGORY_ID NUMBER(10),
    NAME VARCHAR2(400),
    PRIMARY KEY (ID)
);

--CONSULTAS PARA PLANTILLA farm
--MANEJADOR DEL GET
SELECT *
FROM FINCA

--MANEJADOR DEL POST
BEGIN
    INSERT INTO FINCA (ID, ADDRESS, EXENSION, CATEGORY_ID,NAME)
    VALUES(:id, :address, :exension, :category_id, :name);
    :status_code :=201;
END;

--MANEJADOR DEL PUT
BEGIN
    UPDATE FINCA 
    SET ADDRESS = :address, 
        EXENSION = :exension, 
        CATEGORY_ID = :category_id, 
        NAME= :name
    WHERE ID = :id;
    :status_code :=201;
END;

--MANEJADOR DEL DELETE
BEGIN
    DELETE 
    FROM FINCA
    WHERE ID = :id;
    :status_code := 204;
END;

--CONSULTAS PARA PLANTILLA farm/:id
--MANEJADOR DEL GET
SELECT *
FROM FINCA
WHERE ID = :id;

--MANEJADOR DEL DELETE
BEGIN
    DELETE 
    FROM FINCA
    WHERE ID = :id;
    :status_code := 204;
END;


--CREACION DE LA TABLA
CREATE TABLE CLIENTE (
    ID NUMBER(10) NOT NULL,
    NAME VARCHAR2(4000),
    EMAIL VARCHAR2(20),
    AGE NUMBER(10),
    PRIMARY KEY (ID)
);

--CONSULTAS PARA PLANTILLA client
--MANEJADOR DEL GET
SELECT *
FROM CLIENTE

--MANEJADOR DEL POST
BEGIN
    INSERT INTO CLIENTE (ID, NAME, EMAIL, AGE)
    VALUES(:id, :name, :email, :age);
    :status_code :=201;
END;

--MANEJADOR DEL PUT
BEGIN
    UPDATE CLIENTE 
    SET NAME = :name, 
        EMAIL = :email, 
        AGE = :age
    WHERE ID = :id;
    :status_code :=201;
END;

--MANEJADOR DEL DELETE
BEGIN
    DELETE 
    FROM CLIENTE
    WHERE ID = :id;
    :status_code := 204;
END;

--CONSULTAS PARA PLANTILLA client/:id
--MANEJADOR DEL GET
SELECT *
FROM CLIENTE
WHERE ID =:id


--CREACION DE LA TABLA
CREATE TABLE MENSAJE (
    ID NUMBER(10) NOT NULL,
    MESSAGETEXT VARCHAR2(4000), 
    PRIMARY KEY (ID)
);

--CONSULTAS PARA PLANTILLA Mensaje
--MANEJADOR DEL GET
SELECT *
FROM MENSAJE

--MANEJADOR DEL POST
BEGIN
    INSERT INTO MENSAJE (ID, MESSAGETEXT)
    VALUES(:id, :messagetext);
    :status_code :=201;
END;

--MANEJADOR DEL PUT
BEGIN
    UPDATE MENSAJE 
    SET MESSAGETEXT = :messagetext
    WHERE ID = :id;
    :status_code :=201;
END;

--MANEJADOR DEL DELETE
BEGIN
    DELETE 
    FROM MENSAJE
    WHERE ID = :id;
    :status_code := 204;
END;
