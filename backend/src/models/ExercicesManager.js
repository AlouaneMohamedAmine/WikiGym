const AbstractManager = require("./AbstractManager");

class ExercicesManager extends AbstractManager {
  constructor() {
    super({ table: "exercices" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  findExerciceById(id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  insertExercice(exercices, videoExercices, imageExercices) {
    return this.connection.query(
      `insert into ${this.table} (name, description, image, video, muscle_id, admin_id) values (?, ?, ?, ?,?, ?, ?)`,
      [
        videoExercices,
        exercices.name,
        exercices.description,
        imageExercices,
        exercices.muscle_id,
        exercices.admin_id,
      ]
    );
  }
}

module.exports = ExercicesManager;
