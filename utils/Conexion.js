const { Pool } = require('pg');

//Patron singleton con una sola instancia de la base de datos
class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = new Pool({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "root",
        database: "proyecto_patrones"
      });

      Database.instance = this;
    }

    return Database.instance;
  }

  query(text, params) {
    return this.pool.query(text, params);
  }
}

const instance = new Database();
Object.freeze(instance);

module.exports = instance;
