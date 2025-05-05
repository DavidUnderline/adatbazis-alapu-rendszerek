const { executeQuery, getConnection } = require('../config/db');
// const { all } = require('../routes/route-allaskereso');

class Allasok{
    async getAllasok(data){
        const is_accapted = 'true';

        const binds = {
            is_accepted: is_accapted,
        };
        const fields = [];
        const fieldsjoin = [];
        // console.log("--- FRONTEND DATA ---");
        // console.table(data);

        const queries = {
            ceginnerjoin: "inner join ceg c ON c.adoazonosito = a.ceg_adoazonosito",
            kulcsszoinnerjoin: "inner join allaslehetoseg_kulcsszo_kapcsolat ak on ak.allaslehetoseg_id = a.id",
            teruletinnerjoin: "inner join terulet t ON t.id = a.terulet_id",
            likecompany: "AND c.neve LIKE '%' || :company || '%'",
            likekeyword: "AND ak.kulcsszo_neve LIKE '%' || :keyword || '%'",
            likelocation: "AND t.varos LIKE '%' || :location || '%'"
        }

        if(data.company){
            fieldsjoin.push(queries.ceginnerjoin);
            fields.push(queries.likecompany);
            binds.company = data.company;
        }

        if(data.keyword){
            fieldsjoin.push(queries.kulcsszoinnerjoin);
            fields.push(queries.likekeyword);
            binds.keyword = data.keyword;
        }

        if(data.location){
            fieldsjoin.push(queries.teruletinnerjoin);
            fields.push(queries.likelocation);
            binds.location = data.location;
        }
        
        if(data.salarymax){
            fields.push("AND ber <= :salarymax");
            binds.salarymax = data.salarymax;
            fields.push("AND ber >= :salarymin");
            binds.salarymin = data.salarymin;
        }

        const query = `select * from allaslehetoseg a ${fieldsjoin.join(' ')}`+
        ` where is_accepted = :is_accepted ${fields.join(' ')}`;
        // console.log("--- QUERY:\n" + query);
        // console.log("\n--- BINDS:")
        // console.table(binds);
        // return;

        const result = await executeQuery(query, binds);   
        // console.log(result);
        
        return result.length > 0 ? result : false;
    }
};

module.exports = new Allasok();