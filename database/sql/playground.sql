INSERT INTO moderator (email,neve, jelszo) VALUES ('admin@gmail.com', 'admin', 'b6b46253f3a26b7f23ec573cb679d6afaeaf0dc3ada39903b93204edac097ae4');
-- og_password: 'admin'
SELECT * FROM moderator;
SELECT * FROM allaskereso;
SELECT * FROM ceg;
SELECT * FROM ALLASLEHETOSEG;
SELECT * FROM cv;
SELECT * FROM TERULET;
SELECT * FROM KULCSSZO;



DELETE FROM JELENTKEZO WHERE ALLASKERESO_EMAIL = 'jagerpeter04@gmail.com' AND ALLASLEHETOSEG_ID = 3;

  select ALLASKERESO_EMAIL from JELENTKEZO WHERE ALLASLEHETOSEG_ID = 6;


SELECT * FROM ALLASLEHETOSEG;
SELECT * FROM allaslehetoseg_kulcsszo_kapcsolat;
SELECT * FROM kulcsszo;

-- Tesztadatok
INSERT INTO kulcsszo (neve) VALUES ('asd1');
INSERT INTO kulcsszo (neve) VALUES ('asd');
Insert into allaslehetoseg (CIM,LEIRAS,KOVETELMENYEK,MIKOR,BER,IS_ACCEPTED,TERULET_ID,CEG_ADOAZONOSITO,KATEGORIA_NEVE) values ('a','aa','a',to_date('14/05/25','DD/MM/RR'),123123,FALSE,8,12345678901,'Hegesztés kategoria');
INSERT INTO allaslehetoseg_kulcsszo_kapcsolat (allaslehetoseg_id, kulcsszo_neve) VALUES (16, 'asd1');
INSERT INTO allaslehetoseg_kulcsszo_kapcsolat (allaslehetoseg_id, kulcsszo_neve) VALUES (16, 'asd');


-- Törlés
DELETE FROM ALLASLEHETOSEG WHERE id = 16;

-- Ellenőrzés
SELECT * FROM kulcsszo; -- A 'Java' megmarad, mert még van kapcsolat
DELETE FROM allaslehetoseg_kulcsszo_kapcsolat WHERE allaslehetoseg_id = 2;
SELECT * FROM kulcsszo; -- A 'Java' törlődik, mert nincs több kapcsolat


--Megyénkénti átlagbér

SELECT 
  (SELECT megye FROM terulet t WHERE t.id = a.terulet_id) AS megye,
  ROUND(AVG(a.ber), 0) AS atlag_ber
FROM allaslehetoseg a
WHERE a.ber IS NOT NULL
GROUP BY a.terulet_id
ORDER BY atlag_ber DESC;

-- Megyénként az álláslehetőségek számát.


SELECT (SELECT megye FROM terulet t WHERE t.id = a.terulet_id) AS megye,
 COUNT(*) AS allasok_szama
FROM ALLASLEHETOSEG a
WHERE a.IS_ACCEPTED = 1
GROUP BY a.TERULET_ID
FETCH FIRST 5 ROWS ONLY;

-- TOP 5 Legnépszerűbb cég

SELECT 
  c.neve,
  (
    SELECT COUNT(*) 
    FROM jelentkezo j 
    WHERE j.allaslehetoseg_id IN (
      SELECT a2.id 
      FROM allaslehetoseg a2 
      WHERE a2.ceg_adoazonosito = c.adoazonosito 
        AND a2.is_accepted = 1
    )
  ) AS jelentkezok_szama
FROM ceg c
ORDER BY jelentkezok_szama DESC
FETCH FIRST 5 ROWS ONLY;


-- KATEGORIABAN TALALHATO ALLASOK

SELECT COUNT(*), a.KATEGORIA_NEVE
FROM ALLASLEHETOSEG a
WHERE a.TERULET_ID IN (
  SELECT id FROM TERULET
)
GROUP BY a.KATEGORIA_NEVE
FETCH FIRST 5 ROWS ONLY;


SELECT 
  TRUNC(utolso_bejelentkezes) AS datum,
  COUNT(*) AS jelentkezok_szama
FROM allaskereso
GROUP BY TRUNC(utolso_bejelentkezes)
ORDER BY datum
FETCH FIRST 10 ROWS ONLY;

--legtöbbre jelentkezett kategóriák

SELECT kategoria_neve, jelentkezesek_szama
FROM (
  SELECT a.kategoria_neve, COUNT(*) AS jelentkezesek_szama
  FROM jelentkezo j
  JOIN allaslehetoseg a ON j.allaslehetoseg_id = a.id
  GROUP BY a.kategoria_neve
  ORDER BY jelentkezesek_szama DESC
)
FETCH FIRST 5 ROWS ONLY;

---

SELECT ERTEKELES FROM CEGERTEKELES
                WHERE CEG_ADOAZONOSITO = 123123 AND ALLASKERESO_EMAIL = 'jagerpeter04@gmail.com';