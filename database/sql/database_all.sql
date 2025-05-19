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
    neve    VARCHAR2(255),
    email   VARCHAR2(255),
    jelszo  VARCHAR2(255),
    ertekeles   FLOAT -- Az itt megjeleno szam egy atlag lesz a ceg ertekeleseibol
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
   email                VARCHAR2(255) PRIMARY KEY NOT NULL,
   neve                 VARCHAR2(255),
   jelszo               VARCHAR2(255),
   utolso_bejelentkezes DATE,
   vegzettseg           VARCHAR2(255),
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
  allaskereso_email VARCHAR2(255),
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
    ertekeles   NUMBER(1,0) DEFAULT 0,
    ceg_adoazonosito  NUMBER,
    allaskereso_email  VARCHAR2(255),
    PRIMARY KEY(ceg_adoazonosito, allaskereso_email),
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
   cim           VARCHAR2(255),
   leiras        VARCHAR2(4000),
   kovetelmenyek VARCHAR2(255),
   mikor         DATE,
   ber           NUMBER,
   is_accepted   boolean,
   terulet_id    NUMBER,
   ceg_adoazonosito NUMBER,
   kategoria_neve VARCHAR2(255),
   CONSTRAINT foreign_key_teruletek FOREIGN KEY (terulet_id) REFERENCES terulet(id) ON DELETE SET NULL,--mert az álláslehetőség létezhet terület nélkül
   CONSTRAINT foreign_key_ceg_allaslehetoseg FOREIGN KEY (ceg_adoazonosito) REFERENCES ceg(adoazonosito) ON DELETE CASCADE, -- Cég törlésekor az álláslehetőségei is törlődjenek
   CONSTRAINT foreign_key_kategoria FOREIGN KEY (kategoria_neve) REFERENCES kategoria(neve) ON DELETE SET NULL --Kategória törlésekor a Null érték kerül az alaslehetoseg tablaba
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
  allaskereso_email VARCHAR2(255) NOT NULL,
  allaslehetoseg_id NUMBER NOT NULL,

  CONSTRAINT foreign_key_allaskereso_jelentkezo FOREIGN KEY ( allaskereso_email ) REFERENCES allaskereso(email) ON DELETE CASCADE, -- Álláskereső törlésekor a jelentkezései is törlődjenek
  CONSTRAINT foreign_key_allaslehetoseg FOREIGN KEY ( allaslehetoseg_id ) REFERENCES allaslehetoseg(id) ON DELETE CASCADE -- Álláslehetőség törlésekor a jelentkezések is törlődjenek
);

---------------------------------------- TRIGGEREK ----------------------------------------

-------------------- ceg adoazonosito update trigger

CREATE OR REPLACE TRIGGER ceg_adoazonosito_update
BEFORE UPDATE OF adoazonosito ON ceg
FOR EACH ROW
BEGIN
    IF :NEW.adoazonosito <> :OLD.adoazonosito THEN
        UPDATE allaslehetoseg
        SET ceg_adoazonosito = :NEW.adoazonosito
        WHERE ceg_adoazonosito = :OLD.adoazonosito;
    END IF;
END;
/

-------------------- jelentkezo frissito allasereso email trigger

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

-----------------

CREATE OR REPLACE TRIGGER email_update_cegertekeles
BEFORE UPDATE OF email ON allaskereso
FOR EACH ROW
BEGIN
    IF :NEW.email <> :OLD.email THEN
        UPDATE cegertekeles
        SET allaskereso_email = :NEW.email
        WHERE allaskereso_email = :OLD.email;
    END IF;
END;
/

------------------

CREATE OR REPLACE TRIGGER email_update
BEFORE UPDATE OF email ON allaskereso
FOR EACH ROW
BEGIN
    IF :NEW.email <> :OLD.email THEN
        UPDATE cv
        SET allaskereso_email = :NEW.email
        WHERE allaskereso_email = :OLD.email;
    END IF;
END;
/

-------------------- cegertekeles atlag frissito trigger

CREATE OR REPLACE TRIGGER update_ertekeles
AFTER INSERT OR UPDATE OR DELETE ON cegertekeles
BEGIN
    -- Frissíti a ceg táblát a beszúrt értékelések átlagával
    UPDATE ceg
    SET ertekeles = (SELECT NVL(AVG(ertekeles), 0) FROM cegertekeles WHERE ceg_adoazonosito = ceg.adoazonosito)
    WHERE adoazonosito IN (SELECT DISTINCT ceg_adoazonosito FROM cegertekeles);
END;
/

-------------------- allaskereso 90 napon tuli inaktivitas trigger

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

--------------------

CREATE OR REPLACE TRIGGER email_update
BEFORE UPDATE OF email ON allaskereso
FOR EACH ROW
BEGIN
    IF :NEW.email <> :OLD.email THEN
        UPDATE cv
        SET allaskereso_email = :NEW.email
        WHERE allaskereso_email = :OLD.email;
    END IF;
END;
/

-------------------- allaslehetoseg_kulcsszo_kapcsolat torles utan kulcsszo trigger

-- CREATE OR REPLACE TRIGGER trg_clean_kulcsszo_before_parent_delete
-- BEFORE DELETE ON allaslehetoseg
-- FOR EACH ROW
-- DECLARE
-- BEGIN
--   DELETE FROM allaslehetoseg_kulcsszo_kapcsolat
--    WHERE allaslehetoseg_id = :OLD.id;

--   DELETE FROM kulcsszo k
--    WHERE NOT EXISTS (
--      SELECT 1
--      FROM allaslehetoseg_kulcsszo_kapcsolat ak
--      WHERE ak.kulcsszo_neve = k.neve
--    );
-- END;
-- /

---------------------------------------- Tarolt eljarasok ----------------------------------------

-------------------- INSERT Ceg tablaba

CREATE OR REPLACE FUNCTION insert_ceg_func(
  ado IN NUMBER, neve IN VARCHAR2, email IN VARCHAR2, jelszo IN VARCHAR2, ertekeles IN FLOAT)
  RETURN NUMBER
  AS 
  rows_out NUMBER := 0;-- Lokalis deklaracio
  BEGIN

    INSERT INTO ceg
    VALUES (ado, neve, email, jelszo, ertekeles);
    rows_out := SQL%ROWCOUNT;
    DBMS_OUTPUT.PUT_LINE('----------rows_out erteke: ' || TO_CHAR(rows_out));

    RETURN rows_out;

    EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Duplikált adóazonosító vagy kulcs!');
        RETURN rows_out;
    WHEN VALUE_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Érvénytelen adat (pl. túl hosszú szöveg vagy rossz formátum)!');
        RETURN rows_out;
    WHEN INVALID_NUMBER THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Érvénytelen számformátum!');
        RETURN rows_out;
    WHEN PROGRAM_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Belső programozási hiba!');
        RETURN rows_out;
    WHEN ACCESS_INTO_NULL THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: NULL objektumra való hivatkozás!');
        RETURN rows_out;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Egyéb hiba: ' || SQLERRM || ' (Kód: ' || SQLCODE || ')');
        RETURN rows_out;
    
END;
/

-------------------- DELETE Ceg tablabol

CREATE OR REPLACE FUNCTION delete_ceg_func(p_email IN VARCHAR2)
RETURN NUMBER
AS 
rows_out NUMBER := 0;-- Lokalis deklaraciO
BEGIN

    DELETE FROM ceg WHERE email = p_email;

    rows_out := SQL%ROWCOUNT;
    DBMS_OUTPUT.PUT_LINE('----------rows_out erteke: ' || TO_CHAR(rows_out));

    RETURN rows_out;
    EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Nincs ilyen email-cím!');
        RETURN 0;
    WHEN VALUE_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Érvénytelen adat (pl. túl hosszú szöveg vagy rossz formátum)!');
        RETURN 0;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Egyéb hiba: ' || SQLERRM || ' (Kód: ' || SQLCODE || ')');
        RETURN 0;
END;
/

-------------------- INSERT Allaskereso tablaba

CREATE OR REPLACE FUNCTION insert_allaskereso_func(email IN VARCHAR2, neve IN VARCHAR2, jelszo IN VARCHAR2, utolso_bejelentkezes IN DATE, vegzettseg IN VARCHAR2, statusz IN BOOLEAN)
  RETURN NUMBER
  AS 
  rows_out NUMBER := 0;-- Lokális deklaráció
  BEGIN

    INSERT INTO allaskereso
    VALUES (email, neve, jelszo, utolso_bejelentkezes, vegzettseg, statusz);

    rows_out := SQL%ROWCOUNT;
    DBMS_OUTPUT.PUT_LINE('----------rows_out erteke: ' || TO_CHAR(rows_out));

    RETURN rows_out;

    EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Duplikált adóazonosító vagy kulcs!');
        RETURN rows_out;
    WHEN VALUE_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Érvénytelen adat (pl. túl hosszú szöveg vagy rossz formátum)!');
        RETURN rows_out;
    WHEN INVALID_NUMBER THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Érvénytelen számformátum!');
        RETURN rows_out;
    WHEN PROGRAM_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Belső programozási hiba!');
        RETURN rows_out;
    WHEN ACCESS_INTO_NULL THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: NULL objektumra való hivatkozás!');
        RETURN rows_out;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Egyéb hiba: ' || SQLERRM || ' (Kód: ' || SQLCODE || ')');
        RETURN rows_out;
    
END;
/

-------------------- DELETE Allaskereso tablabol

CREATE OR REPLACE FUNCTION delete_allaskereso_func(p_email IN VARCHAR2)
RETURN NUMBER
AS 
rows_out NUMBER := 0;-- Lokalis deklaraciO
BEGIN

    DELETE FROM allaskereso WHERE email = p_email;

    rows_out := SQL%ROWCOUNT;
    DBMS_OUTPUT.PUT_LINE('----------rows_out erteke: ' || TO_CHAR(rows_out));

    RETURN rows_out;
    EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Nincs ilyen email-cím!');
        RETURN 0;
    WHEN VALUE_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Érvénytelen adat (pl. túl hosszú szöveg vagy rossz formátum)!');
        RETURN 0;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Egyéb hiba: ' || SQLERRM || ' (Kód: ' || SQLCODE || ')');
        RETURN 0;
END;
/

-------------------- INSERT CV tablaba

CREATE OR REPLACE FUNCTION insert_cv_func(cv_link IN VARCHAR2, allaskereso_email IN VARCHAR2)
RETURN NUMBER
AS 
rows_out NUMBER := 0;-- Lokális deklaráció
BEGIN

    INSERT INTO cv
    VALUES(cv_link, allaskereso_email);

    rows_out := SQL%ROWCOUNT;
    DBMS_OUTPUT.PUT_LINE('----------rows_out erteke: ' || TO_CHAR(rows_out));

    RETURN rows_out;

    EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Duplikált adóazonosító vagy kulcs!');
        RETURN rows_out;
    WHEN VALUE_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Érvénytelen adat (pl. túl hosszú szöveg vagy rossz formátum)!');
        RETURN rows_out;
    WHEN INVALID_NUMBER THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Érvénytelen számformátum!');
        RETURN rows_out;
    WHEN PROGRAM_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Belső programozási hiba!');
        RETURN rows_out;
    WHEN ACCESS_INTO_NULL THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: NULL objektumra való hivatkozás!');
        RETURN rows_out;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Egyéb hiba: ' || SQLERRM || ' (Kód: ' || SQLCODE || ')');
        RETURN rows_out;
    
END;
/

-------------------- DELETE moderator tablabol

CREATE OR REPLACE FUNCTION delete_moderator_func(p_email IN VARCHAR2)
RETURN NUMBER
AS 
rows_out NUMBER := 0;-- Lokalis deklaraciO
BEGIN

    DELETE FROM moderator WHERE email = p_email;

    rows_out := SQL%ROWCOUNT;
    DBMS_OUTPUT.PUT_LINE('----------rows_out erteke: ' || TO_CHAR(rows_out));

    RETURN rows_out;
    EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Nincs ilyen email-cím!');
        RETURN 0;
    WHEN VALUE_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('Hiba: Érvénytelen adat (pl. túl hosszú szöveg vagy rossz formátum)!');
        RETURN 0;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Egyéb hiba: ' || SQLERRM || ' (Kód: ' || SQLCODE || ')');
        RETURN 0;
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

Insert into ceg (ADOAZONOSITO,NEVE,EMAIL,JELSZO,ERTEKELES) values
(12345678901,'TechTrend Kft.','info@techtrend.hu','cfa1fab990a59f1d415810f6bbfd853b27f9b30dd4b3354a5bd0bbc6ee3b964e',0),
-- (12345678901, 'info@techtrend.hu', 'tech123');
(23456789012,'Érdi Építő Zrt.','epito@erdi.hu','febeb54a56bbddb38a86443bc3ab1c75ef7754ebeb71cdaf13ab0b8b4cf187d9',0),
-- (23456789012, 'epito@erdi.hu', 'epito456');
(34567890123,'Győri Logisztika Kft.','logisztika@gyor.hu','96d934c3e974d53768f761a353bf0c361621d9c8b2cdd00581060e2a0e763d39',0),
-- (34567890123, 'logisztika@gyor.hu', 'logi789');
(45678901234,'Debreceni Szoftver Rt.','szoftver@debrecen.hu','314a43daa966ea268b72c64d18447734ee83601a4de862ceb6215c284e98be0f',0),
-- (45678901234, 'szoftver@debrecen.hu', 'szoft123');
(56789012345,'Szegedi Kereskedelmi Kft.','kereskedelem@szeged.hu','1ac01cbd1bd8fc440d2dba5dbcd953c36b4ec70f79cae9535055191a00b49f91',0),
-- (56789012345,'kereskedelem@szeged.hu', 'ker123');
(67890123456,'Pécsi Gyártó Zrt.','gyarto@pecs.hu','f776f6717007caacc972a958982886f4cf56c4c8e3cb3899b16636778dbcbc09',0),
-- (67890123456,, 'gyarto@pecs.hu', 'gyart456');
(78901234567,'Kecskeméti Autószerviz Kft.','szerviz@kecskemet.hu','faf2212b0c0514e213a0b9c32fed378e1eba948ec2891dc51a988c3e7c9fa73c',0),
-- (78901234567, 'szerviz@kecskemet.hu', 'auto789');
(89012345678,'Székesfehérvári Iroda Bt.','iroda@szekesfehervar.hu','fab1ed9f83fd000f8757a96246863b5d77c2670547d69fb511c2747be5701843',0),
-- (89012345678, 'iroda@szekesfehervar.hu', 'iroda123');
(90123456789,'Kaposvári Vendéglátó Kft.','vendeglato@kaposvar.hu','da6fcfa1cee3ec84723c3e4db8af882eb899c5e674f4951c248553c0265f656f',0),
-- (90123456789, 'vendeglato@kaposvar.hu', 'vend123');
(11234567890,'Zalaegerszegi Építőipari Rt.','epito@zalaegerszeg.hu','daa939b82d36f3532433e65f826148437dc092674e22bf8f092d7751001fe714',0),
-- (11234567890, 'epito@zalaegerszeg.hu', 'epit456');
(22345678901,'Veszprémi Kereskedő Bt.','kereskedelem@veszprem.hu','e6d01d035dc55b0deceedd3b5fb75fd204c938e90532d7ff7597841f08c79df1',0),
-- (22345678901, 'kereskedelem@veszprem.hu', 'ker789');
(33456789012,'Miskolci Gyártó Kft.','gyarto@miskolc.hu','f3eafb84e86d3d7ba7e52efeb006ea4e1fa6f307b2d7d1260cce9d69dcb0eb24',0),
-- (33456789012, 'gyarto@miskolc.hu', 'gyart123');
(44567890123,'Nyíregyházi Szolgáltató Zrt.','szolgaltato@nyiregyhaza.hu','80f91692b89e1f48d87480bcafa02f3c00bc47ebdc340f84449fb53926a63954',0),
-- (44567890123, 'szolgaltato@nyiregyhaza.hu', 'szolg456');
(55678901234,'Szolnoki Logisztika Bt.','logisztika@szolnok.hu','a459f59ef60e6d89116041e3696e153c033be0080cd32aa0fd7a26cfe7d68d4f',0);
-- (55678901234, 'logisztika@szolnok.hu', 'logi123');

---------- Pelda rekordok allaskereso tabla

---------- Pelda rekordok cegertekeles tabla

---------- Pelda rekordok kategoria tabla

INSERT INTO kategoria (neve) VALUES
('Hegesztés kategoria'),
('Gépészet kategoria'),
('Informatika kategoria'),
('Művészet kategoria'),
('Üzlet kategoria');

---------- Pelda rekordok allaslehetoseg tabla

--INSERT INTO allaslehetoseg (cim, leiras, kovetelmenyek, mikor, ber, is_accepted, terulet_id, ceg_adoazonosito, kategoria_neve) VALUES
--('Heggesztés', 'Óriási Munkalehetőség Heggesztő úraknak és hölgyeknek egyaránt.', 'Tudjá heggeszeni.', sysdate, 500000, 1, 1, null, 'Hegesztés kategoria'),
--('Villanyszerelés', 'Kiváló lehetőség tapasztalt villanyszerelők számára.', 'Villanyszerelői végzettség és tapasztalat.', sysdate, 450000, 1, 2, null, 'Gépészet kategoria'),
--('Programozás', 'Junior programozói pozíció kezdőknek.', 'Alapvető programozási ismeretek.', sysdate, 600000, 0, 3, null, 'Informatika kategoria'),
--('Építésvezetés', 'Építkezési projektek vezetésére keresünk szakembert.', 'Építészmérnöki diploma és vezetői tapasztalat.', sysdate, 700000, 1, 4, null, 'Gépészet kategoria'),
--('Grafikai tervezés', 'Kreatív grafikusokat keresünk hosszú távra.', 'Grafikai szoftverek ismerete és kreativitás.', sysdate, 550000, 0, 5, null, 'Művészet kategoria');


---------- Pelda rekordok kulcsszo tabla

INSERT INTO kulcsszo (neve) VALUES
('Hegesztés kulcsszo'),
('Gépészet kulcsszo'),
('Programozás kulcsszo'),
('Művészet kulcsszo'),
('Üzlet kulcsszo');

---------- Pelda rekordok allaslehetoseg_kulcsszo_kapcsolat tabla

--INSERT INTO allaslehetoseg_kulcsszo_kapcsolat (allaslehetoseg_id, kulcsszo_neve) VALUES
--(1, 'Hegesztés kulcsszo'),
--(2, 'Gépészet kulcsszo'),
--(3, 'Programozás kulcsszo'),
--(4, 'Üzlet kulcsszo'),
--(5, 'Programozás kulcsszo'), -- Grafikai allashoz ket kulcsszo
--(5, 'Művészet kulcsszo');

