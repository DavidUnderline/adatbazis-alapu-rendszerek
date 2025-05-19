const { executeQuery, getConnection } = require('../config/db');
const  keywordDao  = require('../dao/kulcsszo-dao');
// const { all } = require('../routes/route-terulet');
// const { all } = require('../routes/route-allaskereso');

class AllaslehetosegDao{
    async getAllasok(data){
        console.log("--- get allasok dao ---");
        console.table(data);

        const is_accapted = 'true';

        const binds = {
            is_accepted: is_accapted,
        };
        // category - keyword - location - company - salarymax - salarymin

        const fieldsjoin = [];
        const fields = [];
        const queries = {
            ceginnerjoin: "inner join ceg c ON c.adoazonosito = a.ceg_adoazonosito",
            kulcsszoinnerjoin: "inner join allaslehetoseg_kulcsszo_kapcsolat ak on ak.allaslehetoseg_id = a.id",
            teruletinnerjoin: "inner join terulet t ON t.id = a.terulet_id",
            kategoriainnerjoin: "inner join kategoria k ON k.neve = a.kategoria_neve",
            likecompany: "AND c.neve IN (SELECT neve FROM ceg WHERE neve LIKE '%' || :company || '%')",
            likekeyword: "AND ak.kulcsszo_neve in (SELECT kulcsszo_neve FROM allaslehetoseg_kulcsszo_kapcsolat WHERE kulcsszo_neve LIKE '%' || :keyword || '%')",
            likelocation: "AND t.varos IN (SELECT varos FROM terulet WHERE varos LIKE '%' || :location || '%')",
            likecategory: "AND k.neve IN (SELECT neve FROM kategoria WHERE neve LIKE '%' || :category || '%')"
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

        if(data.category){
            fieldsjoin.push(queries.kategoriainnerjoin);
            fields.push(queries.likecategory);
            binds.category = data.category;
        }
        
        if(data.salarymax){
            fields.push("AND ber <= :salarymax");
            binds.salarymax = data.salarymax;
            fields.push("AND ber >= :salarymin");
            binds.salarymin = data.salarymin;
        }

        const query = `select * from allaslehetoseg a ${fieldsjoin.join(' ')}`+
        ` where is_accepted = :is_accepted ${fields.join(' ')}`;
        console.log("--- QUERY:\n" + query);
        console.log("\n--- BINDS:")
        console.table(binds);
        // return;

        const result = await executeQuery(query, binds);   
        console.log(result);
        
        return result.length > 0 ? result : false;
    }

    async insertAllas(allas){
        console.log("--- inside insert allas dao ---");
        // console.table(allas);
        // return;

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
            kategoria: allas.kategoria,
        }
        // console.table(insert_binds);
        // return;

        const insert_query = "insert into allaslehetoseg "+
        "(cim, leiras, kovetelmenyek, mikor, ber, is_accepted, terulet_id, ceg_adoazonosito, kategoria_neve) "+
        `values (:cim, :leiras, :kovetelmenyek, TO_TIMESTAMP(:mikor, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'), :ber, :is_accepted, :terulet_id, :adoazonosotito, :kategoria)`;

        const result = await executeQuery(insert_query, insert_binds);
        console.log("result:\t",result);
        // if(result !== 1) return 0;
        // ! ez kelleni fog a kulcsszóhoz
        const job_id = await this.getmaxid();
        console.log("job_id:\t",job_id);

        try{
            for (const k of allas.kulcs_szavak) {
                console.table({allaslehetoseg_id: job_id, kulcsszo_neve: k});
                 
                await keywordDao.insertKeyWord(k);
                await keywordDao.keyword_job_switchboard_insert({allaslehetoseg_id: job_id, kulcsszo_neve: k});
            }
        }catch(err){
            console.error("\n\n\n",err)
        }
        
        return result;
    }
    
    // allaslehetoseg_kulcsszo_kapcstablaba insert
    

    async getmaxid(){
        const query = "select max(id) as id from allaslehetoseg";
        const maxId = await executeQuery(query, {});
        return maxId[0].ID
    }

    async getPendingAllasok(){
        console.log("---[ getPendingAllasok ]---")
        let connection;
        let query = 'SELECT * FROM ALLASLEHETOSEG WHERE IS_ACCEPTED = FALSE';
        const jobs = await executeQuery(query);
        console.log(jobs)
        return jobs;
    }

    async getUserJobs(data){
        console.log("--- dao getUserJobs ---");
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

        console.table(query);
        // console.table(data);
        const jobs = await executeQuery(query, data.tipo === 'ceg' ? { adoazonosito: data.adoazonosito } : {email: data.email});

        return jobs;
    }

    async deleteAllasokById(id){
        console.log("--- inside delete allas dao ---");

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

};

module.exports = new AllaslehetosegDao();