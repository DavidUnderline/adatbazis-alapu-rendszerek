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
   CONSTRAINT foreign_key_kulcsszo FOREIGN KEY ( kulcsszo_id )
      REFERENCES kulcsszo ( id ),
   CONSTRAINT foreign_key_kategoria FOREIGN KEY ( kategoria_id_id )
      REFERENCES kategoria ( id )
)

INSERT INTO allaslehetoseg (
   cim,
   leiras,
   kovetelmenyek,
   mikor,
   ber,
   is_accapted,
   terulet_id,
   ceg_id,
   kulcsszo_id,
   kategoria_id
) VALUES ( "Heggesztés",
           "Óriási Munkalehetőség Heggesztő úraknak és hölgyeknek egyaránt.",
           "Tudjá' heggeszeni.",
           sysdate,
           500000,
           TRUE,
           1,
           35903957804,
           1,
           1 );

INSERT INTO allaslehetoseg (
   cim,
   leiras,
   kovetelmenyek,
   mikor,
   ber,
   is_accapted,
   terulet_id,
   ceg_id,
   kulcsszo_id,
   kategoria_id
) VALUES ( 'Villanyszerelés',
           'Kiváló lehetőség tapasztalt villanyszerelők számára.',
           'Villanyszerelői végzettség és tapasztalat.',
           sysdate,
           450000,
           TRUE,
           2,
           13907287593,
           2,
           2 );


INSERT INTO allaslehetoseg (
   cim,
   leiras,
   kovetelmenyek,
   mikor,
   ber,
   is_accapted,
   terulet_id,
   ceg_id,
   kulcsszo_id,
   kategoria_id
) VALUES ( 'Programozás',
           'Junior programozói pozíció kezdőknek.',
           'Alapvető programozási ismeretek.',
           sysdate,
           600000,
           FALSE,
           3,
           13478097449,
           3,
           3 );


INSERT INTO allaslehetoseg (
   cim,
   leiras,
   kovetelmenyek,
   mikor,
   ber,
   is_accapted,
   terulet_id,
   ceg_id,
   kulcsszo_id,
   kategoria_id
) VALUES ( 'Építésvezetés',
           'Építkezési projektek vezetésére keresünk szakembert.',
           'Építészmérnöki diploma és vezetői tapasztalat.',
           sysdate,
           700000,
           TRUE,
           4,
           40560285869,
           4,
           4 );


INSERT INTO allaslehetoseg (
   cim,
   leiras,
   kovetelmenyek,
   mikor,
   ber,
   is_accapted,
   terulet_id,
   ceg_id,
   kulcsszo_id,
   kategoria_id
) VALUES ( 'Grafikai tervezés',
           'Kreatív grafikusokat keresünk hosszú távra.',
           'Grafikai szoftverek ismerete és kreativitás.',
           sysdate,
           550000,
           FALSE,
           5,
           79613553671,
           5,
           5 );