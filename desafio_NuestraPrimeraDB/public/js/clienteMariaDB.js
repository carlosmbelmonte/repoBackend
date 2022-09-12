const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : '',
        database : 'mibase2'
    }
})

class ClienteMariaDB{
    constructor(nombreTabla){
        this.nombreTabla = nombreTabla;
    }

    crearTablaMariaDB(){
        return knex.schema.dropTableIfExists(this.nombreTabla).finally(() => {
            return knex.schema.createTable(this.nombreTabla, table =>{
                table.increments("ID").primary();
                table.string("Title",15).notNullable();
                table.string("Thumbnail",255).notNullable();
                table.float("Price")
            })    
        })       
    }

    getMariaDB(){
        return knex.from(this.nombreTabla).select("*")
    }

    getMariaDbById(){
        return knex.from(this.nombreTabla).select("*").where({ id: `${id}` })
    }

    postMariaDB(data){
        return knex(this.nombreTabla).insert(data)
    }
}

module.exports = { ClienteMariaDB };