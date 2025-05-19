SET SERVEROUTPUT ON

---------------------------------------- TABLAK ----------------------------------------

-------------------- terulet tabla

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE terulet CASCADE CONSTRAINTS PURGE';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
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
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
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
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
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
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
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
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
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
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
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
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
        NULL;
END;
/

CREATE TABLE allaslehetoseg (
   id            INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
   cim           VARCHAR2(255),
   leiras        VARCHAR2(255),
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
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
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
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
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
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
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
        DBMS_OUTPUT.PUT_LINE('Nem létezik nincs semmi: ' || SQLERRM);
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

-------------------- cegertekeles tablaban emailt frissito trigger

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

-------------------- cv tablaban email frissito trigger

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
('Magyarország', 'Borsod-Abaúj-Zemplén', 'Miskolc'),
('Magyarország', 'Pest', 'Érd'),
('Magyarország', 'Győr-Moson-Sopron', 'Győr'),
('Magyarország', 'Hajdú-Bihar', 'Debrecen'),
('Magyarország', 'Csongrád-Csanád', 'Szeged'),
('Magyarország', 'Baranya', 'Pécs'),
('Magyarország', 'Bács-Kiskun', 'Kecskemét'),
('Magyarország', 'Zala', 'Zalaegerszeg'),
('Magyarország', 'Szabolcs-Szatmár-Bereg', 'Nyíregyháza'),
('Magyarország', 'Jász-Nagykun-Szolnok', 'Szolnok');

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

Insert into allaskereso (EMAIL,NEVE,JELSZO,UTOLSO_BEJELENTKEZES,VEGZETTSEG,STATUSZ) values
('kovacs.janos@gmail.com','Kovács János','f713768814e5f0ff006e86d7769bfd265feb52f058f54a04ce0c6f29ae279f52',to_date('14/05/25','DD/MM/RR'),'mérnök','true'),
-- ('kovacs.janos@gmail.com', 'Kovács János', 'janos123', 'mérnök'),
('nagy.anna@gmail.com','Nagy Anna','a1734c8c81b77c1ec1a3f253677c56b0b799df6ab042f16d420adeb80cd0d485',to_date('14/05/25','DD/MM/RR'),'közgazdász','true'),
-- ('nagy.anna@gmail.com', 'Nagy Anna', 'anna456', 'közgazdász'),
('toth.peter@gmail.com','Tóth Péter','cfe5800a41c72b05e03657277a9411db8041813b4d13504e47c46fa30cbea847',to_date('14/05/25','DD/MM/RR'),'informatikai technikus','true'),
-- ('toth.peter@gmail.com', 'Tóth Péter', 'peter789', 'informatikai technikus'),
('szabo.eva@gmail.com','Szabó Éva','d9d8c1fed9811b280371ad5b0bdc3bcc07b0aec0d3da923e57e571c8286c4e42',to_date('14/05/25','DD/MM/RR'),'HR szakértő','true'),
-- ('szabo.eva@gmail.com', 'Szabó Éva', 'eva123', 'HR szakértő'),
('horvath.laszlo@gmail.com','Horváth László','5d3f8783689739957be504d693065d94ec89120072493bb5d3f5aa95c0e310fd',to_date('14/05/25','DD/MM/RR'), null,'true'),
-- ('horvath.laszlo@gmail.com', 'Horváth László', 'laszlo456'),
('kiss.zsofia@gmail.com','Kiss Zsófia','eda63e385405f8c0a8657ec6dacfb69d13af3ada8b956f58f829724c3aaa53c1',to_date('14/05/25','DD/MM/RR'), null,'true'),
-- ('kiss.zsofia@gmail.com', 'Kiss Zsófia', 'zsofia789'),
('molnar.istvan@gmail.com','Molnár István','f70c769a8d970177736dcd176106fe275b69708900c8e7bfafa6ac59b769073b',to_date('14/05/25','DD/MM/RR'), null,'true'),
-- ('molnar.istvan@gmail.com', 'Molnár István', 'istvan123'),
('farkas.katalin@gmail.com','Farkas Katalin','79e81a01f5f233709bf282d2027f3d6048860e8da152e0491fa0983d37114fa5',to_date('14/05/25','DD/MM/RR'), null,'true'),
-- ('farkas.katalin@gmail.com', 'Farkas Katalin', 'katalin456'),
('balogh.gabor@gmail.com','Balogh Gábor','7e261251c5c0c78fa3190870bce8928d0f4894967a6394fe90a994f8dba0e267',to_date('14/05/25','DD/MM/RR'), null,'true'),
-- ('balogh.gabor@gmail.com', 'Balogh Gábor', 'gabor789'),
('papp.viktoria@gmail.com','Papp Viktória','75d66df59e54c21bd3ee1f0273319ed122b1ee7f0d1f93ceb31edf74e0fd83e8',to_date('14/05/25','DD/MM/RR'), null,'true'),
-- ('papp.viktoria@gmail.com', 'Papp Viktória', 'viktoria123'),
('simon.robert@gmail.com','Simon Róbert','016cb7c405d042a77055c905e7d0d47e8109989dabcd6200b12dab21c9834336',to_date('14/05/25','DD/MM/RR'), null,'true'),
-- ('simon.robert@gmail.com', 'Simon Róbert', 'robert456'),
('veres.julia@gmail.com','Veres Júlia','82af232b0d37828213429369a610ed551b67dd63ab5d3f8c93ee1e936b214e17',to_date('14/05/25','DD/MM/RR'), null,'true'),
-- ('veres.julia@gmail.com', 'Veres Júlia', 'julia789'),
('lukacs.tamas@gmail.com','Lukács Tamás','6709e8de1ce35ab7b011b06bee5bbdbb734daadf348ce31ea0e5514d4785d699',to_date('14/05/25','DD/MM/RR'), null,'true'),
-- ('lukacs.tamas@gmail.com', 'Lukács Tamás', 'tamas123'),
('orosz.dora@gmail.com','Orosz Dóra','088020224ae9b1d0f660c4e48d096bafd5f7d85d5a2b9dd8d0103a7a091d76ad',to_date('14/05/25','DD/MM/RR'),'grafikus','true');
-- ('orosz.dora@gmail.com', 'Orosz Dóra', 'dora456', 'grafikus');

---------- Pelda rekordok cv tabla

INSERT INTO cv (cv_link, allaskereso_email) VALUES
('http://cvlink.com/kovacsjanos', 'kovacs.janos@gmail.com'),
('http://cvlink.com/nagyanna', 'nagy.anna@gmail.com'),
('http://cvlink.com/tothpeter1', 'toth.peter@gmail.com'),
('http://cvlink.com/tothpeter2', 'toth.peter@gmail.com'),
('http://cvlink.com/szabo_eva', 'szabo.eva@gmail.com'),
('http://cvlink.com/horvathlaszlo', 'horvath.laszlo@gmail.com'),
('http://cvlink.com/kisszsofia1', 'kiss.zsofia@gmail.com'),
('http://cvlink.com/kisszsofia2', 'kiss.zsofia@gmail.com'),
('http://cvlink.com/molnaristvan', 'molnar.istvan@gmail.com'),
('http://cvlink.com/baloghgabor', 'balogh.gabor@gmail.com'),
('http://cvlink.com/pappviktoria', 'papp.viktoria@gmail.com'),
('http://cvlink.com/simonrobert', 'simon.robert@gmail.com'),
('http://cvlink.com/veresjulia', 'veres.julia@gmail.com'),
('http://cvlink.com/lukacstamas', 'lukacs.tamas@gmail.com'),
('http://cvlink.com/oroszdora', 'orosz.dora@gmail.com');

---------- Pelda rekordok cegertekeles tabla

INSERT INTO cegertekeles (ertekeles, ceg_adoazonosito, allaskereso_email) VALUES
(4, 12345678901, 'kovacs.janos@gmail.com'),
(5, 12345678901, 'nagy.anna@gmail.com'),
(3, 23456789012, 'toth.peter@gmail.com'),
(4, 23456789012, 'szabo.eva@gmail.com'),
(5, 34567890123, 'horvath.laszlo@gmail.com'),
(3, 34567890123, 'kiss.zsofia@gmail.com'),
(4, 45678901234, 'molnar.istvan@gmail.com'),
(5, 45678901234, 'farkas.katalin@gmail.com'),
(3, 56789012345, 'balogh.gabor@gmail.com'),
(4, 56789012345, 'papp.viktoria@gmail.com'),
(5, 67890123456, 'simon.robert@gmail.com'),
(4, 67890123456, 'veres.julia@gmail.com'),
(3, 78901234567, 'lukacs.tamas@gmail.com'),
(5, 78901234567, 'orosz.dora@gmail.com');

---------- Pelda rekordok kategoria tabla

INSERT INTO kategoria (neve) VALUES
('Hegesztés kategoria'),
('Gépészet kategoria'),
('Informatika kategoria'),
('Művészet kategoria'),
('Üzlet kategoria'),
('Építőipar kategoria'),
('Logisztika kategoria'),
('Pénzügy kategoria'),
('Marketing kategoria'),
('HR kategoria'),
('Vendéglátás kategoria'),
('Egészségügy kategoria'),
('Oktatás kategoria'),
('Jog kategoria');

---------- Pelda rekordok allaslehetoseg tabla

Insert into allaslehetoseg (CIM,LEIRAS,KOVETELMENYEK,MIKOR,BER,IS_ACCEPTED,TERULET_ID,CEG_ADOAZONOSITO,KATEGORIA_NEVE) values 
('asd','asd','asd',to_date('14/05/25','DD/MM/RR'),123123,TRUE,8,23456789012,'Hegesztés kategoria'),
('Szoftverfejlesztő', 'Webalkalmazások fejlesztése', 'Java, Spring', to_date('14/05/25','DD/MM/RR'), 800000, TRUE, 1, 12345678901, 'Informatika kategoria'),
('Építészmérnök', 'Épületek tervezése', 'AutoCAD ismeret', to_date('14/05/25','DD/MM/RR'), 700000, FALSE, 2, 23456789012, 'Építőipar kategoria'),
('Logisztikai menedzser', 'Szállítási folyamatok irányítása', 'Logisztikai tapasztalat', to_date('14/05/25','DD/MM/RR'), 650000, TRUE, 3, 34567890123, 'Logisztika kategoria'),
('Pénzügyi elemző', 'Pénzügyi riportok készítése', 'Excel, SQL', to_date('14/05/25','DD/MM/RR'), 750000, TRUE, 4, 45678901234, 'Pénzügy kategoria'),
('Marketing asszisztens', 'Kampányok támogatása', 'Kreativitás', to_date('14/05/25','DD/MM/RR'), 500000, FALSE, 5, 56789012345, 'Marketing kategoria'),
('HR koordinátor', 'Toborzási feladatok', 'HR tapasztalat', to_date('14/05/25','DD/MM/RR'), 550000, TRUE, 6, 67890123456, 'HR kategoria'),
('Pincér', 'Vendégek kiszolgálása', 'Vendéglátós tapasztalat', to_date('14/05/25','DD/MM/RR'), 400000, TRUE, 7, 78901234567, 'Vendéglátás kategoria'),
('Orvos', 'Betegellátás', 'Orvosi diploma', to_date('14/05/25','DD/MM/RR'), 1000000, TRUE, 8, 89012345678, 'Egészségügy kategoria'),
('Tanár', 'Matematika oktatása', 'Pedagógus végzettség', to_date('14/05/25','DD/MM/RR'), 600000, TRUE, 9, 90123456789, 'Oktatás kategoria'),
('Gépészmérnök', 'Gépek karbantartása', 'Műszaki ismeretek', to_date('14/05/25','DD/MM/RR'), 700000, TRUE, 10, 11234567890, 'Gépészet kategoria'),
('Kereskedelmi asszisztens', 'Ügyfélkapcsolatok kezelése', 'Kommunikációs készség', to_date('14/05/25','DD/MM/RR'), 450000, FALSE, 11, 22345678901, 'Üzlet kategoria'),
('Ügyvéd', 'Jogi tanácsadás', 'Jogász végzettség', to_date('14/05/25','DD/MM/RR'), 900000, TRUE, 12, 33456789012, 'Jog kategoria'),
('Grafikus', 'Grafikai tervezés', 'Photoshop, Illustrator', to_date('14/05/25','DD/MM/RR'), 550000, TRUE, 13, 44567890123, 'Művészet kategoria'),
('Adminisztrátor', 'Irodai feladatok', 'MS Office', to_date('14/05/25','DD/MM/RR'), 400000, FALSE, 14, 55678901234, 'Logisztika kategoria');

---------- Pelda rekordok kulcsszo tabla

INSERT INTO kulcsszo (neve) VALUES
('Hegesztés kulcsszo'),
('Java kulcsszo'),
('Sping kulcsszo'),
('AutoCAD kulcsszo'),
('Logisztika kulcsszo'),
('Excel kulcsszo'),
('SQL kulcsszo'),
('Marketing kulcsszo'),
('HR kulcsszo'),
('Vendéglátás kulcsszo'),
('Orvostudomány kulcsszo'),
('Oktatás kulcsszo'),
('Gépészet kulcsszo'),
('Kereskedelem kulcsszo'),
('Jog kulcsszo'),
('Grafika kulcsszo'),
('Photoshop kulcsszo'),
('Illustrator kulcsszo'),
('MS Office kulcsszo'),
('Adminisztráció kulcsszo');

---------- Pelda rekordok allaslehetoseg_kulcsszo_kapcsolat tabla

INSERT INTO allaslehetoseg_kulcsszo_kapcsolat (allaslehetoseg_id, kulcsszo_neve) VALUES
(1, 'Hegesztés kulcsszo'),
(2, 'Java kulcsszo'),
(2, 'Sping kulcsszo'),
(3, 'AutoCAD kulcsszo'),
(4, 'Logisztika kulcsszo'),
(5, 'Excel kulcsszo'),
(5, 'SQL kulcsszo'),
(6, 'Marketing kulcsszo'),
(7, 'HR kulcsszo'),
(8, 'Vendéglátás kulcsszo'),
(9, 'Orvostudomány kulcsszo'),
(10, 'Oktatás kulcsszo'),
(11, 'Gépészet kulcsszo'),
(12, 'Kereskedelem kulcsszo'),
(13, 'Jog kulcsszo'),
(14, 'Grafika kulcsszo'),
(14, 'Photoshop kulcsszo'),
(14, 'Illustrator kulcsszo'),
(15, 'MS Office kulcsszo'),
(15, 'Adminisztráció kulcsszo');

---------- Pelda rekordok moderator tabla

Insert into moderator (EMAIL,NEVE,JELSZO) values
('admin@gmail.com','admin','b6b46253f3a26b7f23ec573cb679d6afaeaf0dc3ada39903b93204edac097ae4'),
-- ('admin@gmail.com', 'admin', 'admin');
('czuppon.pal@gmail.com','Czuppon Pál Balázs','7d801da9da1ed086f197f7309a9c3c213ccc214c673b2f4a130935780ad71acd'),
-- ('czuppon.pal@gmail.com','Czuppon Pál Balázs', 'admin')
('jagerpeter04@gmail.com','Jáger Péter','4cb25b69c77aabf8f74461beb8f3bdd8a644aba4364731631cf1aada31fceed7'),
-- ('jagerpeter04@gmail.com','Jáger Péter', 'admin'),
('mod2@allas.hu','Szabó Katalin','eb5fae9a4c9ccc7ee2324625a003ea351e1f2823414e01d6cf00604167d7998a'),
-- ('mod2@allas.hu', 'Szabó Katalin', 'mod456'),
('mod3@allas.hu','Nagy István','a521d89cc408d48b7a0cb1402ac9376b1c6cf8e81bd8099d63fea3843517f199'),
-- ('mod3@allas.hu', 'Nagy István', 'mod789'),
('mod4@allas.hu','Tóth Eszter','26b02ba94c72a13f1fb7ce05f01e483e59d1dd54da77f97e2578d67747320dbe'),
-- ('mod4@allas.hu', 'Tóth Eszter', 'mod101'),
('mod5@allas.hu','Horváth Gábor','7528597a7f4a0c106e320629e847b7f9f5d58c5587f184867202f40cc7b68805'),
-- ('mod5@allas.hu', 'Horváth Gábor', 'mod102'),
('mod6@allas.hu','Kiss Anna','94098bcc8477c5d9d5c2654c5cd2db5cb3757fb089ac6f02836a10f57a2aab3b'),
-- ('mod6@allas.hu', 'Kiss Anna', 'mod103'),
('mod7@allas.hu','Molnár Péter','1985a87fa0239758e9cfb2d8e8acc412158e5b9cb4350d1add1ea63c0b5f0703'),
-- ('mod7@allas.hu', 'Molnár Péter', 'mod104'),
('mod8@allas.hu','Farkas Zsófia','bda0cb75f8c9a42627b626a95713d088d3f297121fb83a60c4360ddef2f867e3'),
-- ('mod8@allas.hu', 'Farkas Zsófia', 'mod105'),
('mod9@allas.hu','Balogh László','b004fec26781cecb1535581053585d8670743973a757e390aa7b12cd0d9d55b2'),
-- ('mod9@allas.hu', 'Balogh László', 'mod106'),
('mod10@allas.hu','Papp Viktória','fd656d87105befa552c241028657f9f17a39c36f6afffa1b6d5cfd081ab7dc9f'),
-- ('mod10@allas.hu', 'Papp Viktória', 'mod107'),
('mod11@allas.hu','Simon Róbert','3be225ec0a07b5135de492311500a08137278980c3defa6505b7f567ca4b9857'),
-- ('mod11@allas.hu', 'Simon Róbert', 'mod108'),
('mod12@allas.hu','Veres Júlia','476757286c7edd30f980e938d2552cf9e4dced3b67e6a1d6a3f2842b89852371'),
-- ('mod12@allas.hu', 'Veres Júlia', 'mod109'),
('mod13@allas.hu','Lukács Tamás','502d1c5a4994402dbd356993283489a313175dc061ff3e025b1738fe5896dc12'),
-- ('mod13@allas.hu', 'Lukács Tamás', 'mod110'),
('mod14@allas.hu','Orosz Dóra','afdf0761206e1eebf916dfc6564a289545f2c71f56214550aafce635d963a18b');
-- ('mod14@allas.hu', 'Orosz Dóra', null);

---------- Pelda rekordok jelentkezo tabla

INSERT INTO jelentkezo (allaskereso_email, allaslehetoseg_id) VALUES
('kovacs.janos@gmail.com', 1),
('nagy.anna@gmail.com', 2),
('toth.peter@gmail.com', 3),
('szabo.eva@gmail.com', 4),
('horvath.laszlo@gmail.com', 5),
('kiss.zsofia@gmail.com', 6),
('molnar.istvan@gmail.com', 7),
('farkas.katalin@gmail.com', 8),
('balogh.gabor@gmail.com', 9),
('papp.viktoria@gmail.com', 10),
('simon.robert@gmail.com', 11),
('veres.julia@gmail.com', 12),
('lukacs.tamas@gmail.com', 13),
('orosz.dora@gmail.com', 14);
