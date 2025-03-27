BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE ceg';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
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


-- Példa rekordok beszúrása a ceg táblába

INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id) 
VALUES (35903957804, 'Cég A', 'cega@email.com', 'jelszo123', 4.5, 1);

INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id) 
VALUES (13907287593, 'Cég B', 'cegb@email.com', 'jelszo456', 3.8, 2);

INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id) 
VALUES (13478097449, 'Cég C', 'cegc@email.com', 'jelszo789', 4.2, 3);

INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id) 
VALUES (40560285869, 'Cég D', 'cegd@email.com', 'jelszo012', 4.7, 4);

INSERT INTO ceg (adoazonosito, neve, email, jelszo, ertekeles, terulet_id) 
VALUES (79613553671, 'Cég E', 'cege@email.com', 'jelszo345', 4.0, 5);