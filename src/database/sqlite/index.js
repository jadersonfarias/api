const sqlite3 = require("sqlite3") //driver
const sqlite = require("sqlite") //conecta 
const path = require("path")//bibliteca

async function sqliteConnection() {
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"), //filename para dizer aonde vai ser criado
        driver: sqlite3.Database                                  //__dirname pega de forma automatica onde eu estou
    });
  
    return database;
}

module.exports = sqliteConnection;