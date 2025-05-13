const { executeQuery, getConnection } = require('../config/db');

class StatisticsDao{

  async megyenkentiAllasokSzama(){
    const query = `
      SELECT (SELECT megye FROM terulet t WHERE t.id = a.terulet_id) AS megye,
       COUNT(*) AS allasok_szama
      FROM ALLASLEHETOSEG a
      WHERE a.IS_ACCEPTED = 1
      GROUP BY a.TERULET_ID
      FETCH FIRST 5 ROWS ONLY
    `;

    const res = executeQuery(query, {});

    return res;
}

async getTopCeg(){
  const query = `
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
    FETCH FIRST 5 ROWS ONLY
  `

  const res = await executeQuery(query, {});
  return res;
}

async getAvgFizu(){
  const query= `
    SELECT 
      (SELECT megye FROM terulet t WHERE t.id = a.terulet_id) AS megye,
      ROUND(AVG(a.ber), 0) AS atlag_ber
    FROM allaslehetoseg a
    WHERE a.ber IS NOT NULL
    GROUP BY a.terulet_id
    ORDER BY atlag_ber DESC
  `;

  const res = await executeQuery(query);
  return res

}

async getPopularCategories(){
  const query = `
      SELECT kategoria_neve, jelentkezesek_szama
    FROM (
      SELECT a.kategoria_neve, COUNT(*) AS jelentkezesek_szama
      FROM jelentkezo j
      JOIN allaslehetoseg a ON j.allaslehetoseg_id = a.id
      GROUP BY a.kategoria_neve
      ORDER BY jelentkezesek_szama DESC
    )
    FETCH FIRST 5 ROWS ONLY
      `;
  const res = await executeQuery(query)
  return res
}


}

module.exports = new StatisticsDao();