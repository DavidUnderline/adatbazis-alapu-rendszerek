BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE terulet';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        NULL;
END;
/

CREATE TABLE terulet(
    id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    orszag  VARCHAR2(255),
    megye VARCHAR2(255),
    varos VARCHAR2(255)
)

--miert csak orszag, megye, varos? ugyis varchar, akkor mar beirhatunk egy teljes cimet is ha olyan van
--persze nem muszaj

INSERT INTO terulet (orszag, megye, varos) VALUES ('Magyarország', 'Pest', 'Budapest');
INSERT INTO terulet (orszag, megye, varos) VALUES ('Magyarország', 'Fejér', 'Székesfehérvár');
INSERT INTO terulet (orszag, megye, varos) VALUES ('Magyarország', 'Veszprém', 'Veszprém');
INSERT INTO terulet (orszag, megye, varos) VALUES ('Magyarország', 'Somogy', 'Kaposvár');
INSERT INTO terulet (orszag, megye, varos) VALUES ('Magyarország', 'Borsod-Abaúj-Zemplén', 'Miskolc');