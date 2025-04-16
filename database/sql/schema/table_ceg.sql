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