const { executeQuery, getConnection } = require('../config/db');
// const { all } = require('../routes/route-allaskereso');

class AllaslehetosegDao{
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

    async insertAllas(allas){
        // console.log(allas);

        const query_terulet_id = "select id from terulet where varos = :varos";
        const terulet_id = await executeQuery(query_terulet_id, {varos: allas.varos});

        const query_ceg_adoid = "select adoazonosito from ceg where email = :email";
        const ceg_adoid = await executeQuery(query_ceg_adoid, {email: allas.email});
        
        const insert_binds = {
            cim: allas.cim,
            leiras: allas.leiras,
            kovetelmenyek: allas.kovetelmenyek,
            mikor: allas.mikor,
            ber: allas.ber,
            is_accepted: allas.is_accepted,
            terulet_id: terulet_id[0].ID,
            adoazonosotito: ceg_adoid[0].ADOAZONOSITO,
        }
        // console.table(insert_binds);
        // return;

        const insert_query = "insert into allaslehetoseg "+
        "(cim, leiras, kovetelmenyek, mikor, ber, is_accepted, terulet_id, ceg_adoazonosito) "+
        `values (:cim, :leiras, :kovetelmenyek, TO_TIMESTAMP(:mikor, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'), :ber, :is_accepted, :terulet_id, :adoazonosotito)`;
        
        return await executeQuery(insert_query, insert_binds);
    }

    async getPendingAllasok(){
        let connection;
        let query = 'SELECT * FROM ALLASLEHETOSEG WHERE IS_ACCEPTED = FALSE';
        try{
            connection = await getConnection();
            const jobs = await connection.execute(query);
            return jobs;
        }catch(err){
            console.error(err);
            throw err;
        }
    }

    async deleteAllasokById(id){
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `DELETE FROM allaslehetoseg WHERE id = :id`,
                { id },
                { autoCommit: true }
            );
            return result.rowsAffected === 1;
        } catch (err) {
            console.error('Error deleting Allaslehetoseg:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    async acceptPendingAllasokById(id){
        let connection;
        try {
            connection = await getConnection();
            const result = await connection.execute(
                `UPDATE allaslehetoseg SET is_accepted = true WHERE id = :id`,
                { id },
                { autoCommit: true }
            );
            return result.rowsAffected === 1;
        } catch (err) {
            console.error('Error deleting Allaslehetoseg:', err);
            throw err;
        } finally {
            if (connection) await connection.close();
        }
    }

    async getUserJobs(data){
        console.log("inside allasok dao getUserJobs");
        console.table(data);
        // return;
    
        let query = "";
        if(data.tipo === "allaskereso"){
            query = "select * from allaslehetoseg a "+
            "inner join jelentkezo j on j.allaslehetoseg_id = a.id "+
            "where j.allaskereso_email = :email";
            
        } else{
            query = "select * from allaslehetoseg where ceg_adoazonosito = :adoazonosito";
        }

        // console.table(query);
        // console.table(data);
        const jobs = await executeQuery(query, data.tipo === 'ceg' ? { adoazonosito: data.adoazonosito } : {email: data.email});
        console.table(jobs);

        return jobs;
    }
};

module.exports = new AllaslehetosegDao();