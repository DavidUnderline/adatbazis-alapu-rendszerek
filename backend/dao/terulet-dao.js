const { executeQuery, getConnection } = require('../config/db');

class Terulet {
    async getvarosok() {
        const query = 'select varos from terulet';
        // console.log("inside terulet dao");

        const result = await executeQuery(query, {});
        console.log(result);
        return result;
    }
}

module.exports = new Terulet();