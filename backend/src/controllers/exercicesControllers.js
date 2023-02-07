const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const VideoExercicesDirectory = process.env.AVATAR_DIRECTORY || "public/";
const imgExercicesDirectory = process.env.AVATAR_DIRECTORY || "public/";

const browse = (req, res) => {
  models.exercices
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { id } = req.params;

  models.exercices
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

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    // récupération du nom de fichier de la vidéo et de l'img à supprimer
    const [results] = await models.exercices.find(id);
    const exercicesName = results[0].name;
    const imgexercicesName = results[0].img;

    // suppression de la vidéo dans la base de données
    const [result] = await models.exercices.delete(id);
    if (result.affectedRows === 0) res.sendStatus(404);
    else {
      // suppression du fichier vidéo
      fs.unlink(`${VideoExercicesDirectory}${exercicesName}`, (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          // suppression du fichier image
          fs.unlink(`${imgExercicesDirectory}${imgexercicesName}`, (err1) => {
            if (err1) {
              console.error(err1);
              res.sendStatus(500);
            } else {
              res.sendStatus(204);
            }
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
const renameExercices = (req, res, next) => {
  // TODO : gérer les erreurs
  // On récupère le nom du fichier
  const originalname = req.files.exercices[0].originalname.replace(/\s/g, "-");

  // On récupère le nom du fichier
  const { filename } = req.files.exercices[0];

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();
  fs.rename(
    `${VideoExercicesDirectory}${filename}`,
    `${VideoExercicesDirectory}${uuid}-${originalname}`,
    (err) => {
      console.error("rename: ", err);
      if (err) throw err;
      req.exercices = `${uuid}-${originalname}`;
      next();
    }
  );
};
const renameImgExercices = (req, res, next) => {
  // TODO : gérer les erreurs
  // On récupère le nom du fichier
  const { originalname } = req.files.img[0];

  // On récupère le nom du fichier
  const { filename } = req.files.img[0];

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();
  fs.rename(
    `${imgExercicesDirectory}${filename}`,
    `${imgExercicesDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.img = `${uuid}-${originalname}`;
      next();
    }
  );
};

const uploadExercices = (req, res) => {
  const exercicesName = req.exercices;
  const exercices = req.body;
  const imgexercicesName = req.img;

  models.exercices
    .insert(exercices, exercicesName, imgexercicesName)
    .then(([result]) => {
      res.status(201).location(`/api/exercices/${result.insertId}`).send();
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
const sendExercices = (req, res) => {
  const { fileName } = req.params;

  res.download(VideoExercicesDirectory + fileName, fileName, (err) => {
    if (err) {
      console.error("error download: ", err);
    }
  });
};

const sendImgExercices = (req, res) => {
  const { fileName } = req.params;

  res.download(imgExercicesDirectory + fileName, fileName, (err) => {
    if (err) {
      console.error("error download: ", err);
    }
  });
};

module.exports = {
  renameExercices,
  sendExercices,
  uploadExercices,
  browse,
  read,
  renameImgExercices,
  sendImgExercices,
  destroy,
};
