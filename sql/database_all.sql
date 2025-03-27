
SET SERVEROUTPUT ON

---------------------------------------- TABLAK ----------------------------------------

-------------------- terulet tabla

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE terulet CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE terulet(
    id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    orszag  VARCHAR2(255),
    megye VARCHAR2(255),
    varos VARCHAR2(255)
)

-------------------- ceg tabla

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE ceg CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE ceg(
   -- adoazonosito INT
    adoazonosito    NUMBER(11,0) PRIMARY KEY NOT NULL,
    neve    VARCHAR(255),
    email   VARCHAR(255),
    jelszo  VARCHAR(255),
    ertekeles   FLOAT, -- Az itt megjeleno szam egy atlag lesz a ceg ertekeleseibol
    terulet_id  NUMBER,
    CONSTRAINT foreign_key_terulet FOREIGN KEY (terulet_id) REFERENCES terulet(id)
)

-------------------- cegertekeles tabla

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE cegertekeles CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE cegertekeles(
    id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    ertekeles   NUMBER(1,0) DEFAULT 0,
    ceg_adoazonosito  NUMBER,
    allaskereso_id  NUMBER,
    CONSTRAINT foreign_key_ceg FOREIGN KEY (ceg_adoazonosito) REFERENCES ceg(adoazonosito) ON DELETE CASCADE-- ,
    -- CONSTRAINT foreign_key_allaskereso FOREIGN KEY (allaskereso_id) REFERENCES allaskereso(id)
)


---------------------------------------- TRIGGEREK ----------------------------------------

BEGIN
    EXECUTE IMMEDIATE 'DROP TRIGGER update_ertekeles';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE OR REPLACE TRIGGER update_ertekeles
AFTER INSERT OR UPDATE OR DELETE ON cegertekeles
DECLARE
BEGIN
    -- Frissíti a ceg táblát a beszúrt értékelések átlagával
    UPDATE ceg
    SET ertekeles = (SELECT NVL(AVG(ertekeles), 0) FROM cegertekeles WHERE ceg_adoazonosito = ceg.adoazonosito)
    WHERE adoazonosito IN (SELECT DISTINCT ceg_adoazonosito FROM cegertekeles);
END;
/

---------------------------------------- ADATOK ----------------------------------------

---------- Pelda rekordok terulet tabla

INSERT INTO terulet (orszag, megye, varos) VALUES ('Magyarország', 'Pest', 'Budapest');
INSERT INTO terulet (orszag, megye, varos) VALUES ('Magyarország', 'Fejér', 'Székesfehérvár');
INSERT INTO terulet (orszag, megye, varos) VALUES ('Magyarország', 'Veszprém', 'Veszprém');
INSERT INTO terulet (orszag, megye, varos) VALUES ('Magyarország', 'Somogy', 'Kaposvár');
INSERT INTO terulet (orszag, megye, varos) VALUES ('Magyarország', 'Borsod-Abaúj-Zemplén', 'Miskolc');

---------- Pelda rekordok ceg tabla

INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id) 
VALUES (35903957804, 'Cég A', 'cega@email.com', 'jelszo123', NULL, NULL);

INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id) 
VALUES (13907287593, 'Cég B', 'cegb@email.com', 'jelszo456', NULL, NULL);

INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id) 
VALUES (13478097449, 'Cég C', 'cegc@email.com', 'jelszo789', NULL, NULL);

INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id) 
VALUES (40560285869, 'Cég D', 'cegd@email.com', 'jelszo012', NULL, NULL);

INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id) 
VALUES (79613553671, 'Cég E', 'cege@email.com', 'jelszo345', NULL, NULL);

---------- Pelda rekordok cegertekeles tabla

INSERT INTO cegertekeles (ertekeles, ceg_adoazonosito, allaskereso_id) VALUES (DEFAULT, 35903957804, NULL);
INSERT INTO cegertekeles (ertekeles, ceg_adoazonosito, allaskereso_id) VALUES (DEFAULT, 13907287593, NULL);
INSERT INTO cegertekeles (ertekeles, ceg_adoazonosito, allaskereso_id) VALUES (DEFAULT, 13478097449, NULL);
INSERT INTO cegertekeles (ertekeles, ceg_adoazonosito, allaskereso_id) VALUES (DEFAULT, 40560285869, NULL);
INSERT INTO cegertekeles (ertekeles, ceg_adoazonosito, allaskereso_id) VALUES ( DEFAULT, 79613553671, NULL);