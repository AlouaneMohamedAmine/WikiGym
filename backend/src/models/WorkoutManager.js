const AbstractManager = require("./AbstractManager");

class WorkoutManager extends AbstractManager {
  constructor() {
    super({ table: "workout" });
  }

  createWorkout(workout) {
    return this.connection.query(
      `insert into ${this.table} (name, user_id) values (?, ?, ?)`,
      [workout.name, workout.user_id]
    );
  }

  updateWorkout(workout) {
    return this.connection.query(
      `update ${this.table} set name = ?,  user_id = ? where id = ?`,
      [workout.name, workout.user_id, workout.id]
    );
  }

  deleteWorkout(workoutId) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      workoutId,
    ]);
  }

  find() {
    return this.connection.query(`select * from ${this.table}`);
  }

  findWorkoutById(workoutIdid) {
    return this.connection.query(`select * from ${this.table} where id = ?`, [
      workoutIdid,
    ]);
  }
}

module.exports = WorkoutManager;
