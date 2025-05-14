INSERT INTO moderator (email,neve, jelszo) VALUES ('admin@gmail.com', 'admin', 'b6b46253f3a26b7f23ec573cb679d6afaeaf0dc3ada39903b93204edac097ae4');
-- og_password: 'admin'
SELECT * FROM moderator;
SELECT * FROM allaskereso;

DELETE FROM JELENTKEZO WHERE ALLASKERESO_EMAIL = 'jagerpeter04@gmail.com' AND ALLASLEHETOSEG_ID = 3;

  select ALLASKERESO_EMAIL from JELENTKEZO WHERE ALLASLEHETOSEG_ID = 6;



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