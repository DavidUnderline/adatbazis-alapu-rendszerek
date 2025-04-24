const { executeQuery, getConnection } = require('../config/db');

class Allasok{
    async getAllasok(data){
        let sql = "";
        const is_accapted = 'true';

        let params = {
            is_accepted: is_accapted,
            location: data.location,
            company: data.company,
        };

        if(Object.keys(data).length === 2){
            sql = "SELECT * FROM allaslehetoseg LEFT JOIN TERULET t ON t.id = terulet_id"+
            " WHERE is_accepted = :is_accepted"+ 
            " AND terulet_id = :location"+ 
            " AND (cim LIKE '%' || :company || '%')";
            
        } else{
            sql = "SELECT * FROM allaslehetoseg LEFT JOIN TERULET t ON t.id = terulet_id"+
                " WHERE is_accepted = :is_accepted"+ 
                " AND terulet_id = :location"+ 
                " AND (cim LIKE '%' || :company || '%')"+
                " AND kovetelmenyek LIKE '%' || :requirement || '%'"+ 
                " AND (ber <= :salarymax AND ber >= :salarymin)";

            params.requirement = data.requirement;
            params.salarymax = data.salarymax;
            params.salarymin = data.salarymin;
        }
        
        const result = await executeQuery(sql, params);        
        return result.length > 0 ? result : null;
    }
};

module.exports = new Allasok();