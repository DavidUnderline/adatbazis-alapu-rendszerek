
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
   statusz              BOOLEAN
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
  cv_link VARCHAR2(255) PRIMARY KEY NOT NULL,
  allaskereso_email VARCHAR(255),
  CONSTRAINT foreign_key_allaskereso_cv FOREIGN KEY (allaskereso_email) REFERENCES allaskereso(email) ON DELETE CASCADE
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
    FOREIGN KEY (kulcsszo_neve) REFERENCES kulcsszo(neve) ON DELETE CASCADE
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
   neve VARCHAR2(255) PRIMARY KEY NOT NULL,
   allaslehetoseg_id INT,
   FOREIGN KEY (allaslehetoseg_id) REFERENCES allaslehetoseg(id) ON DELETE CASCADE
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

CREATE TABLE jelentkezo( --Ez is csak egy kapcsolotabla
  allaskereso_email VARCHAR(255) NOT NULL,
  allaslehetoseg_id NUMBER NOT NULL,

  CONSTRAINT foreign_key_allaskereso_jelentkezo FOREIGN KEY ( allaskereso_email ) REFERENCES allaskereso(email) ON DELETE CASCADE, -- Álláskereső törlésekor a jelentkezései is törlődjenek
  CONSTRAINT foreign_key_allaslehetoseg FOREIGN KEY ( allaslehetoseg_id ) REFERENCES allaslehetoseg(id) ON DELETE CASCADE -- Álláslehetőség törlésekor a jelentkezések is törlődjenek
);

---------------------------------------- TRIGGEREK ----------------------------------------
-------------------- jelentkezo (allaslehetoseg_allaskereso_kapcsolat) tabla frissito trigger
BEGIN
    EXECUTE IMMEDIATE 'DROP TRIGGER update_child_email';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
        NULL;
END;
/

CREATE OR REPLACE TRIGGER update_child_email
BEFORE UPDATE OF email ON allaskereso
FOR EACH ROW
BEGIN
    IF :NEW.email <> :OLD.email THEN
    UPDATE jelentkezo
    SET allaskereso_email = :NEW.email
    WHERE allaskereso_email = :OLD.email;
    END IF;
END;
/

-------------------- cegertekeles atlag frissito trigger
BEGIN
    EXECUTE IMMEDIATE 'DROP TRIGGER update_ertekeles';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
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

--------------------allaskereso 90 napon tuli inaktivitas trigger

BEGIN
    EXECUTE IMMEDIATE 'DROP TRIGGER allaskereso_inactive_trigger';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
        NULL;
END;
/

CREATE OR REPLACE TRIGGER allaskereso_inactive_trigger
AFTER LOGON ON DATABASE
BEGIN
  -- Dinamikusan futtatjuk az UPDATE-et
  EXECUTE IMMEDIATE
    'UPDATE allaskereso
        SET statusz = 0
      WHERE utolso_bejelentkezes < SYSDATE - 90';
END;
/

---------------------------------------- Oracle Scheduler ----------------------------------------
-- Csak mert megtehetem es ilyet is tudok, de azert triggerrel is megcsinalom, hogy a kovetelmeny ki legyen elegitve

BEGIN
    DBMS_SCHEDULER.DROP_JOB (
        job_name => 'UPDATE_INACTIVE_USERS_JOB',
        force    => TRUE
    );
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a job nem létezik, csendben folytatjuk
        DBMS_OUTPUT.PUT_LINE('Hiba történt a job törlésekor: ' || SQLERRM);
        NULL;
END;
/

BEGIN
    DBMS_SCHEDULER.CREATE_JOB (
        job_name        => 'UPDATE_INACTIVE_USERS_JOB',
        job_type        => 'PLSQL_BLOCK',
        job_action      => 'BEGIN UPDATE allaskereso SET statusz = 0 WHERE utolso_bejelentkezes IS NOT NULL AND utolso_bejelentkezes < SYSDATE - 90; END;',
        start_date      => SYSTIMESTAMP,
        repeat_interval => 'FREQ=DAILY;BYHOUR=0;BYMINUTE=0;BYSECOND=0',
        enabled         => TRUE,
        auto_drop       => FALSE,
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

---------- Pelda rekordok allaskereso tabla


---------- Pelda rekordok cegertekeles tabla

---------- Pelda rekordok allaslehetoseg tabla

INSERT INTO allaslehetoseg (cim, leiras, kovetelmenyek, mikor, ber, is_accepted, terulet_id, ceg_adoazonosito) VALUES
('Heggesztés', 'Óriási Munkalehetőség Heggesztő úraknak és hölgyeknek egyaránt.', 'Tudjá heggeszeni.', sysdate, 500000, 1, 1, null),
('Villanyszerelés', 'Kiváló lehetőség tapasztalt villanyszerelők számára.', 'Villanyszerelői végzettség és tapasztalat.', sysdate, 450000, 1, 2, null),
('Programozás', 'Junior programozói pozíció kezdőknek.', 'Alapvető programozási ismeretek.', sysdate, 600000, 0, 3, null),
('Építésvezetés', 'Építkezési projektek vezetésére keresünk szakembert.', 'Építészmérnöki diploma és vezetői tapasztalat.', sysdate, 700000, 1, 4, null),
('Grafikai tervezés', 'Kreatív grafikusokat keresünk hosszú távra.', 'Grafikai szoftverek ismerete és kreativitás.', sysdate, 550000, 0, 5, null);

---------- Pelda rekordok kategoria tabla

INSERT INTO kategoria (neve, allaslehetoseg_id) VALUES
('Hegesztés kategoria', 1),
('Gépészet kategoria', 1),
('Informatika kategoria', 3),
('Művészet kategoria', 5),
('Üzlet kategoria', 4);

---------- Pelda rekordok kulcsszo tabla

INSERT INTO kulcsszo (neve) VALUES
('Hegesztés kulcsszo'),
('Gépészet kulcsszo'),
('Programozás kulcsszo'),
('Művészet kulcsszo'),
('Üzlet kulcsszo');

---------- Pelda rekordok allaslehetoseg_kulcsszo_kapcsolat tabla

INSERT INTO allaslehetoseg_kulcsszo_kapcsolat (allaslehetoseg_id, kulcsszo_neve) VALUES
(1, 'Hegesztés kulcsszo'),
(2, 'Gépészet kulcsszo'),
(3, 'Programozás kulcsszo'),
(4, 'Üzlet kulcsszo'),
(5, 'Programozás kulcsszo'), -- Grafikai allashoz ket kulcsszo
(5, 'Művészet kulcsszo');
