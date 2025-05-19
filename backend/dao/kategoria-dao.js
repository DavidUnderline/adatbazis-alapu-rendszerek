const { executeQuery, getConnection } = require('../config/db');

class KategoriaDao {
    async getcategories() {
        console.log("--- get categories dao---");
        const query = "select neve from kategoria";
        return await executeQuery(query);
    }

    async getcategory(data) {
        console.log("--- get (1) category dao---");
        const query = "select neve from kategoria where neve = :keyword";
        return await executeQuery(query, { keyword: data.keyword });
    }

    // Új categoria beszúrása
    async insertcategory(data) {
        console.log("--- insert category dao ---");

        const isduplicate = await this.getcategory(data);
        if (isduplicate.length > 0) return false;
        console.log(isduplicate)

        const query = `INSERT INTO kategoria (neve) VALUES (:keyword)`;
        return await executeQuery(query, { keyword: data.keyword });
    }

}

module.exports = new KategoriaDao();