

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
   ceg_adoazonosito        NUMBER,
   kulcsszo_neve   VARCHAR2(255),
   kategoria_neve  VARCHAR2(255),
   CONSTRAINT foreign_key_teruletek FOREIGN KEY ( terulet_id ) REFERENCES terulet ( id ),
   CONSTRAINT foreign_key_ceg_allaslehetoseg FOREIGN KEY ( ceg_adoazonosito ) REFERENCES ceg ( adoazonosito )--,
   --CONSTRAINT foreign_key_kulcsszo FOREIGN KEY ( kulcsszo_neve ) REFERENCES kulcsszo ( id ),
   --CONSTRAINT foreign_key_kategoria FOREIGN KEY ( kategoria_neve ) REFERENCES kategoria ( id )
);