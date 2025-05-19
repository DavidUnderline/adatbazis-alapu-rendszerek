const { executeQuery, getConnection } = require('../config/db');

class KulcsszoDao {
    // Kulcsszavak lekérdezése egy adott álláslehetőséghez
    async getKulcsszoByAllaslehetosegID(job_id) {
        const query =`
        SELECT KULCSSZO_NEVE FROM ALLASLEHETOSEG_KULCSSZO_KAPCSOLAT
        WHERE ALLASLEHETOSEG_ID =: job_id
        `;
        const key_words = await executeQuery(query, {job_id: job_id})
        
        return key_words;
    }

    async getKeyWords() {
        console.log("--- get categories dao---");
        const query = "select neve from kulcsszo";
        return await executeQuery(query);
    }

    async getaKeyWord(data) {
        console.log("--- get (1) keyword dao---");
        console.log(data)
        
        const query = "select neve from kulcsszo where neve = :keyword";
        return await executeQuery(query, { keyword: data });
    }

    // Új categoria beszúrása
    async insertKeyWord(data) {
        console.log("--- insert keyWord dao ---");
        console.log(data)
        const isduplicate = await this.getaKeyWord(data);
        console.log("isduplicate",isduplicate)
        if (isduplicate.length > 0) return false;
        console.log(isduplicate)

        const query = `INSERT INTO kulcsszo (neve) VALUES (:keyword)`;
        return await executeQuery(query, { keyword: data });
    }

    async keyword_job_switchboard_insert(data){
        console.log("--- keyword_job_switchboard_insert ---");
        // const a = this.getaKeyWord(data.kulcsszo_neve)
        // if (!a) return;
        const query = `INSERT INTO allaslehetoseg_kulcsszo_kapcsolat (allaslehetoseg_id, kulcsszo_neve) VALUES (:allaslehetoseg_id, :kulcsszo_neve)`;
        return await executeQuery(query, data);
    }
}

module.exports = new KulcsszoDao();