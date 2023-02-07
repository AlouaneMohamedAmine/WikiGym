const models = require("../models");

const browseWorkout = (req, res) => {
  models.workout
    .findAllWorkout()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const readWorkout = (req, res) => {
  const { id } = req.params;

  models.workout
    .find(id)
    .then(([results]) => {
      if (results[0]) res.send(results[0]);
      else res.sendStatus(404);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const addWorkout = (req, res) => {
  const workout = req.body;

  models.workout
    .createWorkout(workout)
    .then(([result]) => {
      res.location(`/api/workouts/${result.insertId}`).sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const editWorkout = (req, res) => {
  const workout = req.body;
  workout.id = parseInt(req.params.id, 10);

  models.workout
    .updateWorkout(workout)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const destroyWorkout = (req, res) => {
  const { id } = req.params;
  models.workout
    .deleteWorkout(id)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browseWorkout,
  readWorkout,
  addWorkout,
  editWorkout,
  destroyWorkout,
};
