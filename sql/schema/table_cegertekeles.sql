
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE cegertekeles';
EXCEPTION
    WHEN OTHERS THEN
        -- Ha a tabla nem letezik semmi nincs
        NULL;
END;
/

CREATE TABLE cegertekeles(
    id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    ertekeles   NUMBER(1,0) DEFAULT 0,
    allaskereso_id  NUMBER,
    ceg_adoazonosito NUMBER,
    CONSTRAINT foreign_key_ceg FOREIGN KEY (ceg_adoazonosito) REFERENCES ceg(adoazonosito) ON DELETE CASCADE,
    CONSTRAINT foreign_key_allaskereso FOREIGN KEY (allaskereso_id) REFERENCES allaskereso(id)
)

INSERT INTO cegertekeles (ertekeles, ceg_adoazonosito, allaskereso_id) 
VALUES (
    5, 123456789, 1
);

