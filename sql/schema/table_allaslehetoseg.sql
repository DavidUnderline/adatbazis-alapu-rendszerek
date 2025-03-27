BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE allaslehetoseg';
EXCEPTION
   WHEN other THEN
      NULL;
END;
/

CREATE TABLE allaslehetoseg (
   id            INT
      GENERATED ALWAYS AS IDENTITY
   PRIMARY KEY NOT NULL,
   cim           VARCHAR(255),
   leiras        VARCHAR2(255),
   kovetelmenyek VARCHAR2(255),
   mikor         DATE,
   ber           NUMBER,
   is_accapted   boolean,
   terulet_id    NUMBER,
   ceg_id        NUMBER,
   kulcsszo_neve   NUMBER,
   kategoria_neve  NUMBER,
   CONSTRAINT foreign_key_teruletek FOREIGN KEY ( terulet_id )
      REFERENCES terulet ( id ),
   CONSTRAINT foreign_key_ceg FOREIGN KEY ( ceg.adoazonosito )
      REFERENCES ceg ( id ),
   CONSTRAINT foreign_key_kulcsszo FOREIGN KEY ( kulcsszo_neve )
      REFERENCES kulcsszo ( neve ),
   CONSTRAINT foreign_key_kategoria FOREIGN KEY ( kategoria_neve )
      REFERENCES kategoria ( neve )
)