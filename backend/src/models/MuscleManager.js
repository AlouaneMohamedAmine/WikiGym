const AbstractManager = require("./AbstractManager");

class MuscleManager extends AbstractManager {
  constructor() {
    super({ table: "Muscle" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  insert(muscle) {
    return this.connection.query(
      `insert into ${this.table} (name) values (?)`,
      [muscle.name]
    );
  }

  update(muscle) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      muscle,
      muscle.id,
    ]);
  }
}

module.exports = MuscleManager;
