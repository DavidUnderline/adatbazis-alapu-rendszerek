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
  allaskereso_email VARCHAR(255) PRIMARY KEY NOT NULL,
  allaslehetoseg_id NUMBER PRIMARY KEY NOT NULL,

  CONSTRAINT foreign_key_allaskereso FOREIGN KEY ( allaskereso_email ) REFERENCES allaskereso(email),
  CONSTRAINT foreign_key_allaslehetoseg FOREIGN KEY ( allaslehetoseg_id ) REFERENCES allaslehetoseg(id)
);