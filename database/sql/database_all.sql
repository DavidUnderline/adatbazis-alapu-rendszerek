
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
);

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
    CONSTRAINT foreign_key_terulet FOREIGN KEY (terulet_id) REFERENCES terulet(id) ON DELETE SET NULL--mert a cég létezhet terület nélkül
);

-------------------- cv tabla

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE cv CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE cv(
  cv_link VARCHAR2(255) PRIMARY KEY NOT NULL
);

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
   statusz              boolean
);

-------------------- Allaskereso es CV kapcsolat tabla
--Hogy egy allaskeresohoz tobb CV is tartozhasson. Ez a legkevesbe redundans megoldas

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE allaskereso_cv_kapcsolat CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE allaskereso_cv_kapcsolat (
    email VARCHAR2(255),
    cv_link VARCHAR2(255),
    PRIMARY KEY (email, cv_link),
    FOREIGN KEY (email) REFERENCES allaskereso(email) ON DELETE CASCADE,--Álláskereső törlésekor a CV-kapcsolatai is törlődjenek
    FOREIGN KEY (cv_link) REFERENCES cv(cv_link) ON DELETE CASCADE --CV törlésekor a kapcsolatai is törlődjenek
);

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
    allaskereso_email  VARCHAR(255),
    CONSTRAINT foreign_key_ceg FOREIGN KEY (ceg_adoazonosito) REFERENCES ceg(adoazonosito) ON DELETE CASCADE,--Cég törlésekor az értékelései is törlődjenek
    CONSTRAINT foreign_key_allaskereso FOREIGN KEY (allaskereso_email) REFERENCES allaskereso(email) ON DELETE CASCADE --Álláskereső törlésekor az általa adott értékelések is törlődjenek
);


-------------------- kategoria tabla

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE kategoria CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE kategoria (
   neve VARCHAR2(255) PRIMARY KEY NOT NULL
);

-------------------- kulcsszo tabla

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE kulcsszo CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE kulcsszo(
  neve VARCHAR2(255) PRIMARY KEY NOT NULL
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
   ceg_adoazonosito NUMBER,
   CONSTRAINT foreign_key_teruletek FOREIGN KEY (terulet_id) REFERENCES terulet(id) ON DELETE SET NULL,--mert az álláslehetőség létezhet terület nélkül
   CONSTRAINT foreign_key_ceg_allaslehetoseg FOREIGN KEY (ceg_adoazonosito) REFERENCES ceg(adoazonosito) ON DELETE CASCADE -- Cég törlésekor az álláslehetőségei is törlődjenek
);

-------------------- allaslehetoseg es kulcsszo kapcsolat tabla
--Hogy egy allaslehetoseghez tobb kulcsszo is tartozhasson. Ez a legkevesbe redundans megoldas

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE allaslehetoseg_kulcsszo_kapcsolat CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE allaslehetoseg_kulcsszo_kapcsolat (
    allaslehetoseg_id INT,
    kulcsszo_neve VARCHAR2(255),
    PRIMARY KEY (allaslehetoseg_id, kulcsszo_neve),
    FOREIGN KEY (allaslehetoseg_id) REFERENCES allaslehetoseg(id) ON DELETE CASCADE, -- Álláslehetőség törlésekor a kulcsszó-kapcsolatai is törlődjenek
    FOREIGN KEY (kulcsszo_neve) REFERENCES kulcsszo(neve)
);

-------------------- allaslehetoseg es kategoria kapcsolat tabla
--Hogy egy allaslehetoseg tobb kategoria is tartozhasson. Ez a legkevesbe redundans megoldas

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE allaslehetoseg_kategoria_kapcsolat CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE allaslehetoseg_kategoria_kapcsolat (
    allaslehetoseg_id INT,
    kategoria_neve VARCHAR2(255),
    PRIMARY KEY (allaslehetoseg_id, kategoria_neve),
    FOREIGN KEY (allaslehetoseg_id) REFERENCES allaslehetoseg(id)ON DELETE CASCADE, -- Álláslehetőség törlésekor a kulcsszó-kapcsolatai is törlődjenek
    FOREIGN KEY (kategoria_neve) REFERENCES kategoria(neve)
);

-------------------- moderator tabla

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE moderator CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE moderator(
  email VARCHAR2(255) PRIMARY KEY NOT NULL,
  neve VARCHAR2(255) NOT NULL,
  jelszo VARCHAR2(255) not NULL
);

-------------------- jelentkezo tabla

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE jelentkezo CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Hiba történt: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE jelentkezo(
  allaskereso_email VARCHAR(255) NOT NULL,
  allaslehetoseg_id NUMBER NOT NULL,

  CONSTRAINT foreign_key_allaskereso_jelentkezo FOREIGN KEY ( allaskereso_email ) REFERENCES allaskereso(email) ON DELETE CASCADE, -- Álláskereső törlésekor a jelentkezései is törlődjenek
  CONSTRAINT foreign_key_allaslehetoseg FOREIGN KEY ( allaslehetoseg_id ) REFERENCES allaslehetoseg(id) ON DELETE CASCADE -- Álláslehetőség törlésekor a jelentkezések is törlődjenek
);

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

CREATE OR REPLACE TRIGGER allaskereso_inactive_trigger
    BEFORE UPDATE OF utolso_bejelentkezes ON allaskereso
    FOR EACH ROW
    WHEN (NEW.utolso_bejelentkezes IS NOT NULL)
    BEGIN
        IF :OLD.utolso_bejelentkezes IS NOT NULL AND :OLD.utolso_bejelentkezes < SYSDATE - 90 THEN
            :NEW.statusz := 0; -- Passzív státusz
        END IF;
    END;
/

---------------------------------------- Oracle Scheduler ----------------------------------------
-- Csak mert megtehetem es ilyet is tudok, de azert triggerrel is megcsinalom, hogy a kovetelmeny ki legyen elegitve
BEGIN
    -- Job letrehozasa
    EXECUTE IMMEDIATE '
    CREATE OR REPLACE PROCEDURE update_inactive_users
    AS
    BEGIN
        UPDATE allaskereso
        SET statusz = 0 -- Passzív státusz (false)
        WHERE utolso_bejelentkezes IS NOT NULL
          AND utolso_bejelentkezes < SYSDATE - 90;
        COMMIT;
    END;';
END;
/

BEGIN
    -- Ütemezett job létrehozása
    DBMS_SCHEDULER.CREATE_JOB (
        job_name        => 'UPDATE_INACTIVE_USERS_JOB',
        job_type        => 'PLSQL_BLOCK',
        job_action      => 'BEGIN update_inactive_users; END;',
        start_date      => SYSTIMESTAMP,
        repeat_interval => 'FREQ=DAILY;BYHOUR=0;BYMINUTE=0;BYSECOND=0', -- Minden éjfélkor
        enabled         => TRUE,
        comments        => 'Napi álláskereső státusz frissítés 90 nap inaktivitás után'
    );
END;
/

---------------------------------------- ADATOK ----------------------------------------

---------- Pelda rekordok terulet tabla

INSERT INTO terulet (orszag, megye, varos) VALUES 
('Magyarország', 'Pest', 'Budapest'),
('Magyarország', 'Fejér', 'Székesfehérvár'),
('Magyarország', 'Veszprém', 'Veszprém'),
('Magyarország', 'Somogy', 'Kaposvár'),
('Magyarország', 'Borsod-Abaúj-Zemplén', 'Miskolc');

---------- Pelda rekordok ceg tabla

INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id) VALUES
(35903957804, 'Cég A', 'cega@email.com', 'jelszo123', NULL, NULL), 
(13907287593, 'Cég B', 'cegb@email.com', 'jelszo456', NULL, NULL),
(13478097449, 'Cég C', 'cegc@email.com', 'jelszo789', NULL, NULL),
(40560285869, 'Cég D', 'cegd@email.com', 'jelszo012', NULL, NULL),
(79613553671, 'Cég E', 'cege@email.com', 'jelszo345', NULL, NULL);

---------- Pelda rekordok cv tabla

INSERT INTO cv (cv_link) VALUES
('http://example.com/cv1'),
('http://example.com/cv2'),
('http://example.com/cv3'),
('http://example.com/cv4'),
('http://example.com/cv5');

---------- Pelda rekordok allaskereso tabla

INSERT INTO allaskereso (email, neve, jelszo, utolso_bejelentkezes, vegzettseg, statusz)VALUES 
('john.doe@example.com', 'John Doe', 'password123', TO_DATE('2023-01-01', 'YYYY-MM-DD'), 'Bachelor', 1),
('jane.smith@example.com', 'Jane Smith', 'securepass', TO_DATE('2023-02-15', 'YYYY-MM-DD'), 'Master', 0),
('alice.wonderland@example.com', 'Alice Wonderland', 'alice2023', TO_DATE('2023-03-10', 'YYYY-MM-DD'), 'PhD', 1),
('bob.builder@example.com', 'Bob Builder', 'buildit', TO_DATE('2023-04-20', 'YYYY-MM-DD'), 'Diploma', 0),
('charlie.brown@example.com', 'Charlie Brown', 'charlie123', TO_DATE('2023-05-05', 'YYYY-MM-DD'), 'High School', 1);

---------- Pelda rekordok allaskereso_cv_kapcsolat tabla
INSERT INTO allaskereso_cv_kapcsolat (email, cv_link) VALUES
('john.doe@example.com', 'http://example.com/cv1'),
('john.doe@example.com', 'http://example.com/cv2'), -- John Doe-nak ket CV-je van
('jane.smith@example.com', 'http://example.com/cv2'),
('alice.wonderland@example.com', 'http://example.com/cv3'),
('bob.builder@example.com', 'http://example.com/cv4'),
('charlie.brown@example.com', 'http://example.com/cv5');

---------- Pelda rekordok cegertekeles tabla

INSERT INTO cegertekeles (ertekeles, ceg_adoazonosito, allaskereso_email) VALUES
(DEFAULT, 35903957804, 'john.doe@example.com'),
(DEFAULT, 13907287593, 'jane.smith@example.com'),
(DEFAULT, 13478097449, 'alice.wonderland@example.com'),
(DEFAULT, 40560285869, 'bob.builder@example.com'),
(DEFAULT, 79613553671, 'charlie.brown@example.com');

---------- Pelda rekordok kategoria tabla

INSERT INTO kategoria (neve) VALUES
('Hegesztés kategoria'),
('Gépészet kategoria'),
('Informatika kategoria'),
('Művészet kategoria'),
('Üzlet kategoria');

---------- Pelda rekordok kulcsszo tabla

INSERT INTO kulcsszo (neve) VALUES
('Hegesztés kulcsszo'),
('Gépészet kulcsszo'),
('Programozás kulcsszo'),
('Művészet kulcsszo'),
('Üzlet kulcsszo');

---------- Pelda rekordok allaslehetoseg tabla

INSERT INTO allaslehetoseg (cim, leiras, kovetelmenyek, mikor, ber, is_accepted, terulet_id, ceg_adoazonosito) VALUES
('Heggesztés', 'Óriási Munkalehetőség Heggesztő úraknak és hölgyeknek egyaránt.', 'Tudjá heggeszeni.', sysdate, 500000, 1, 1, 35903957804),
('Villanyszerelés', 'Kiváló lehetőség tapasztalt villanyszerelők számára.', 'Villanyszerelői végzettség és tapasztalat.', sysdate, 450000, 1, 2, 13907287593),
('Programozás', 'Junior programozói pozíció kezdőknek.', 'Alapvető programozási ismeretek.', sysdate, 600000, 0, 3, 13478097449),
('Építésvezetés', 'Építkezési projektek vezetésére keresünk szakembert.', 'Építészmérnöki diploma és vezetői tapasztalat.', sysdate, 700000, 1, 4, 40560285869),
('Grafikai tervezés', 'Kreatív grafikusokat keresünk hosszú távra.', 'Grafikai szoftverek ismerete és kreativitás.', sysdate, 550000, 0, 5, 79613553671);

---------- Pelda rekordok allaslehetoseg_kulcsszo_kapcsolat tabla

INSERT INTO allaslehetoseg_kulcsszo_kapcsolat (allaslehetoseg_id, kulcsszo_neve) VALUES
(1, 'Hegesztés kulcsszo'),
(2, 'Gépészet kulcsszo'),
(3, 'Programozás kulcsszo'),
(4, 'Üzlet kulcsszo'),
(5, 'Programozás kulcsszo'), -- Grafikai allashoz ket kulcsszo
(5, 'Művészet kulcsszo');

---------- Pelda rekordok allaslehetoseg_kategoria_kapcsolat tabla
INSERT INTO allaslehetoseg_kategoria_kapcsolat (allaslehetoseg_id, kategoria_neve) VALUES
(1, 'Hegesztés kategoria'),
(2, 'Gépészet kategoria'),
(3, 'Informatika kategoria'),
(3, 'Üzlet kategoria'), -- Programozas allashoz ket kategoria
(4, 'Üzlet kategoria'),
(5, 'Művészet kategoria');

---------- Pelda rekordok moderator tabla

INSERT INTO moderator VALUES
('examolemoderator1@moderator.com', 'mod_1', 'kiscica1'),
('examolemoderator2@moderator.com', 'mod_2', 'kiscica2'),
('examolemoderator3@moderator.com', 'mod_3', 'kiscica3'),
('examolemoderator4@moderator.com', 'mod_4', 'kiscica4'),
('examolemoderator5@moderator.com', 'mod_5', 'kiscica5');

---------- Pelda rekordok jelentkezo tabla
--Tulajdonképpen ez is egy kapcsolattabla

INSERT INTO jelentkezo ( allaskereso_email, allaslehetoseg_id) VALUES
('john.doe@example.com', 1),
('jane.smith@example.com', 2),
('alice.wonderland@example.com', 3),
('bob.builder@example.com', 4),
('charlie.brown@example.com', 5);
