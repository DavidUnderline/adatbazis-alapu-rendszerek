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


}

module.exports = new StatisticsDao();