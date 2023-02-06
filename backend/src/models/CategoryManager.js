const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  insert(category) {
    return this.connection.query(
      `insert into ${this.table} (name) values (?)`,
      [category.name]
    );
  }

  update(category) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      category,
      category.id,
    ]);
  }
}

module.exports = CategoryManager;
