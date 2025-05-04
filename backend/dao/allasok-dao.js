const { executeQuery, getConnection } = require('../config/db');

class Allasok{
    async getAllasok(data){
        let connection;
        const is_accapted = 'true';

        const binds = {
            is_accepted: is_accapted,
        };
        const fields = [];

        console.table(data);
        // console.log(Object.keys(data).length);
        
        // ! ezt is
        // |  company    │   'ceg'    │
        // │  location   │     1      │
        // │ requirement │ 'kulcsszo' │
        // │  salarymax  │    200     │
        // │  salarymin  │    100     │
        
        // TODO
        // ! innentol itt at kell beszelni
        // kell kulon field joinnak
        // if(!data.company){
            // ! join-os hozzafuzes
            // binds.company = data.company;
        // }

        if(data.location != 0){
            fields.push("AND t.varos LIKE '%' || :location || '%'");
            binds.location = data.location;
        }

        // if(!data.keyword){
        //     fields.push(" AND kovetelmenyek LIKE '%' || :requirement || '%'");
        // }

        if(data.salarymax > 0){
            fields.push("AND ber <= :salarymax");
            binds.salarymax = data.salarymax;
        }
        if(data.salarymin > 0){
            fields.push("AND ber >= :salarymin");
            binds.salarymin = data.salarymin;
        }
            // sql = "SELECT * FROM allaslehetoseg LEFT JOIN TERULET t ON t.id = terulet_id"+
            // " WHERE is_accepted = :is_accepted"+ 
            // " AND terulet_id = :location"+ 
            // " AND (cim LIKE '%' || :company || '%')";
            
            // sql = "SELECT * FROM allaslehetoseg LEFT JOIN TERULET t ON t.id = terulet_id"+
            //     " WHERE is_accepted = :is_accepted"+ 
            //     " AND terulet_id = :location"+ 
            //     " AND (cim LIKE '%' || :company || '%')"+
            //     " AND kovetelmenyek LIKE '%' || :requirement || '%'"+ 
            //     " AND (ber <= :salarymax AND ber >= :salarymin)";

        const query = `select * from allaslehetoseg inner join terulet t ON t.id = terulet_id`+
        ` where is_accepted = :is_accepted ${fields.join(' ')}`;
        console.log(query);
        console.table(binds);
        // return;

        try{
            const result = await executeQuery(query, binds);   
            console.log(result);
            return result.length > 0 ? result : null;

        } catch (err) {
            console.error('Error fetching allasok:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
        // !
    }
};

module.exports = new Allasok();