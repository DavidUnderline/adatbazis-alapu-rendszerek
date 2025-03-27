
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

-------------------- allaskereso tabla

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE allaskereso CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE allaskereso (
   email                VARCHAR(255) PRIMARY KEY NOT NULL,
   neve                 VARCHAR(255),
   jelszo               VARCHAR(255),
   utolso_bejelentkezes DATE,
   vegzettseg           VARCHAR(255),
   statusz              boolean,
   cv_id                INT--,
   --CONSTRAINT foreign_key_cv FOREIGN KEY ( cv_id ) REFERENCES cv ( cv_link )
);

-------------------- allaslehetoseg tabla

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE allaslehetoseg CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE allaslehetoseg (
   id            INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
   cim           VARCHAR(255),
   leiras        VARCHAR2(255),
   kovetelmenyek VARCHAR2(255),
   mikor         DATE,
   ber           NUMBER,
   is_accepted   boolean,
   terulet_id    NUMBER,
   ceg_adoazonosito        NUMBER,
   kulcsszo_neve   VARCHAR2(255),
   kategoria_neve  VARCHAR2(255),
   CONSTRAINT foreign_key_teruletek FOREIGN KEY ( terulet_id ) REFERENCES terulet ( id ),
   CONSTRAINT foreign_key_ceg_allaslehetoseg FOREIGN KEY ( ceg_adoazonosito ) REFERENCES ceg ( adoazonosito )--,
   --CONSTRAINT foreign_key_kulcsszo FOREIGN KEY ( kulcsszo_neve ) REFERENCES kulcsszo ( id ),
   --CONSTRAINT foreign_key_kategoria FOREIGN KEY ( kategoria_neve ) REFERENCES kategoria ( id )
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

---------- Pelda rekordok allaskereso tabla

INSERT INTO allaskereso (
  email,
  neve,
  jelszo,
  utolso_bejelentkezes,
  vegzettseg,
  statusz,
  cv_id
) 
VALUES 
  ( 'john.doe@example.com', 
    'John Doe', 
    'password123', 
    TO_DATE('2023-01-01', 'YYYY-MM-DD'), 
    'Bachelor', 
    1, 
    1 
  ),
  ( 'jane.smith@example.com', 
    'Jane Smith', 
    'securepass', 
    TO_DATE('2023-02-15', 'YYYY-MM-DD'), 
    'Master', 
    0, 
    2 
  ),
  ( 'alice.wonderland@example.com', 
    'Alice Wonderland', 
    'alice2023', 
    TO_DATE('2023-03-10', 'YYYY-MM-DD'), 
    'PhD', 
    1, 
    3 
  ),
  ( 'bob.builder@example.com', 
    'Bob Builder', 
    'buildit', 
    TO_DATE('2023-04-20', 'YYYY-MM-DD'), 
    'Diploma', 
    0, 
    4 
  ),
  ( 'charlie.brown@example.com', 
    'Charlie Brown', 
    'charlie123', 
    TO_DATE('2023-05-05', 'YYYY-MM-DD'), 
    'High School', 
    1, 
    5 
  );

---------- Pelda rekordok allaslehetoseg tabla

INSERT INTO allaslehetoseg (
   cim,
   leiras,
   kovetelmenyek,
   mikor,
   ber,
   is_accepted,
   terulet_id,
   ceg_adoazonosito,
   kulcsszo_neve,
   kategoria_neve
) VALUES ( 'Heggesztés',
           'Óriási Munkalehetőség Heggesztő úraknak és hölgyeknek egyaránt.',
           'Tudjá heggeszeni.',
           sysdate,
           500000,
           1,
           1,
           35903957804,
           '1',
           '1' );

INSERT INTO allaslehetoseg (
   cim,
   leiras,
   kovetelmenyek,
   mikor,
   ber,
   is_accepted,
   terulet_id,
   ceg_adoazonosito,
   kulcsszo_neve,
   kategoria_neve
) VALUES ( 'Villanyszerelés',
           'Kiváló lehetőség tapasztalt villanyszerelők számára.',
           'Villanyszerelői végzettség és tapasztalat.',
           sysdate,
           450000,
           1,
           2,
           13907287593,
           '2',
           '2' );


INSERT INTO allaslehetoseg (
   cim,
   leiras,
   kovetelmenyek,
   mikor,
   ber,
   is_accepted,
   terulet_id,
   ceg_adoazonosito,
   kulcsszo_neve,
   kategoria_neve
) VALUES ( 'Programozás',
           'Junior programozói pozíció kezdőknek.',
           'Alapvető programozási ismeretek.',
           sysdate,
           600000,
           0,
           3,
           13478097449,
           '3',
           '3' );


INSERT INTO allaslehetoseg (
   cim,
   leiras,
   kovetelmenyek,
   mikor,
   ber,
   is_accepted,
   terulet_id,
   ceg_adoazonosito,
   kulcsszo_neve,
   kategoria_neve
) VALUES ( 'Építésvezetés',
           'Építkezési projektek vezetésére keresünk szakembert.',
           'Építészmérnöki diploma és vezetői tapasztalat.',
           sysdate,
           700000,
           1,
           4,
           40560285869,
           '4',
           '4' );


INSERT INTO allaslehetoseg (
   cim,
   leiras,
   kovetelmenyek,
   mikor,
   ber,
   is_accepted,
   terulet_id,
   ceg_adoazonosito,
   kulcsszo_neve,
   kategoria_neve
) VALUES ( 'Grafikai tervezés',
           'Kreatív grafikusokat keresünk hosszú távra.',
           'Grafikai szoftverek ismerete és kreativitás.',
           sysdate,
           550000,
           0,
           5,
           79613553671,
           '5',
           '5' );