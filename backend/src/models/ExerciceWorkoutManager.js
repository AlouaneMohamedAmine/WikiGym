const AbstractManager = require("./AbstractManager");

class ExerciseWorkoutManager extends AbstractManager {
  constructor() {
    super({ table: "exercice_workout" });
  }

  findAll() {
    return this.connection.query(`SELECT * FROM ${this.table}`);
  }

  findById(id) {
    return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [
      id,
    ]);
  }

  findByWorkoutId(workoutId) {
    return this.connection.query(
      `select * from ${this.table} where workout_id = ?`,
      [workoutId]
    );
  }

  findByExerciceId(exerciceId) {
    return this.connection.query(
      `select * from ${this.table} where exercice_id = ?`,
      [exerciceId]
    );
  }

  deleteByWorkoutId(workoutId) {
    return this.connection.query(
      `delete from ${this.table} where workout_id = ?`,
      [workoutId]
    );
  }

  deleteByExerciceId(exerciceId) {
    return this.connection.query(
      `delete from ${this.table} where exercice_id = ?`,
      [exerciceId]
    );
  }

  addExerciseWorkout(exerciceId, workoutId) {
    return this.connection.query(
      `INSERT INTO ${this.table} (exercice_id, workout_id) VALUES (?, ?)`,
      [exerciceId, workoutId]
    );
  }
}

module.exports = ExerciseWorkoutManager;
