
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
    ceg_adoazonosito  NUMBER,
    allaskereso_id  NUMBER,
    CONSTRAINT foreign_key_ceg FOREIGN KEY (ceg_adoazonosito) REFERENCES ceg(adoazonosito) ON DELETE CASCADE-- ,
    -- CONSTRAINT foreign_key_allaskereso FOREIGN KEY (allaskereso_id) REFERENCES allaskereso(id)
)

