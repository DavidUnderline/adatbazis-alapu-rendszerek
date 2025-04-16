
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
