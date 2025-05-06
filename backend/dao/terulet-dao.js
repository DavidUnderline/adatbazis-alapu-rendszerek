const { executeQuery, getConnection } = require('../config/db');

class Terulet {
    async getvarosok() {
        const query = 'select varos from terulet';
        // console.log("inside terulet dao");

        const result = await executeQuery(query, {});
        console.log(result);
        return result;
    }

    async getVarosById(id){
        const query = 'select varos from terulet where ID =: id';
        
        try{
            const city = await executeQuery(query, {id: id});
            return city[0].VAROS;
        }catch(err){
            console.error(err);
            throw err;
        }
    }
}

module.exports = new Terulet();