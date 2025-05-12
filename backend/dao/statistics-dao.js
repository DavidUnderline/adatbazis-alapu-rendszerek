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


}

module.exports = new StatisticsDao();