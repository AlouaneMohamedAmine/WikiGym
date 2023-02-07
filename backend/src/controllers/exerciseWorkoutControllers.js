const models = require("../models");

const browse = (req, res) => {
  models.exercice_workout
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const browseByWorkoutId = (req, res) => {
  const { workoutId } = req.params;

  models.exercice_workout
    .findByWorkoutId(workoutId)
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const browseByExerciceId = (req, res) => {
  const { exerciceId } = req.params;

  models.exercice_workout
    .findByExerciceId(exerciceId)
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const destroyByWorkoutId = (req, res) => {
  const { workoutId } = req.params;

  models.exercice_workout
    .deleteByWorkoutId(workoutId)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const destroyByExerciceId = (req, res) => {
  const { exerciceId } = req.params;

  models.exercice_workout
    .deleteByExerciceId(exerciceId)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const addExerciceWorkout = (req, res) => {
  const { exerciceId, workoutId } = req.body;
  models.exerciceWorkout
    .addExerciceWorkout(exerciceId, workoutId)
    .then(([result]) => {
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browseByWorkoutId,
  browseByExerciceId,
  destroyByWorkoutId,
  destroyByExerciceId,
  browse,
  addExerciceWorkout,
};
