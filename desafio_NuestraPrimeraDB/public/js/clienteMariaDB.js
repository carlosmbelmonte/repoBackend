const Knex = require("knex");

class ClienteMariaDB{
    constructor(knexConfig, tableName){
        this.db = Knex(knexConfig)
        this.nombreTabla = tableName
    }

    crearTablaMariaDB(){
        return this.db.schema.dropTableIfExists(this.nombreTabla).finally(() => {
            return this.db.schema.createTable(this.nombreTabla, table =>{
                table.increments("ID").primary();
                table.string("Title",15).notNullable();
                table.string("Thumbnail",255).notNullable();
                table.float("Price")
            })    
        })       
    }

    getMariaDB(){
        return this.db.from(this.nombreTabla).select("*")
    }

    getMariaDbById(id){
        return this.db.from(this.nombreTabla).select("*").where({ id: `${id}` })
    }

    postMariaDB(data){
        return this.db(this.nombreTabla).insert(data)
    }

    deleteMariaDbById(id){
        return this.db(this.nombreTabla).where({ id: `${id}` }).del()
    }

    putMariaDbById(id, objPut){
        return this.db(this.nombreTabla).where({ id: `${id}` }).update(
            {
                Title: `${objPut.Title}`, 
                Price: `${objPut.Price}`, 
                Thumbnail: `${objPut.Thumbnail}`
            }
        )
    }
}

module.exports = { ClienteMariaDB };